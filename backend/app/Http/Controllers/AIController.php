<?php

namespace App\Http\Controllers;

use App\Models\AI;
use App\Models\Plan;
use App\Models\Goal;
use App\Models\User;
use App\Models\Transaction;
use App\Models\Earning;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AIController extends Controller
{
    public function previewPlans(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'target_amount' => 'required|numeric|min:1',
            'target_date' => 'required|date|after:today',
            'target_frequency' => 'nullable|in:daily,weekly,monthly',
        ]);

        $user = Auth::user();
        $targetAmount = $validated['target_amount'];

        $plans = Plan::where('min_amount', '<=', $user->balance)->get();

        $recommendations = $plans->map(function ($plan) use ($targetAmount) {
            $minUnits = ceil($targetAmount / $plan->max_amount);
            $maxUnits = ceil($targetAmount / $plan->min_amount);

            $maxTotal = $minUnits * $plan->max_amount;
            $minTotal = $maxUnits * $plan->min_amount;

            return [
                'id' => $plan->id,
                'name' => $plan->name,
                'min_amount' => $plan->min_amount,
                'max_amount' => $plan->max_amount,
                'interval' => $plan->profit_interval,
                'min_units' => $minUnits,
                'max_units' => $maxUnits,
                'min_total' => $minTotal,
                'max_total' => $maxTotal
            ];
        });

        $bestPlan = $recommendations->sortBy('min_total')->first();

        return response()->json([
            'message' => 'Here are some plans to help you reach your goal.',
            'recommended_plans' => $recommendations,
            'best_plan' => $bestPlan
        ]);
    }


    public function saveGoal(Request $request)
    {
        $validated = $request->validate([
            'plan_id' => 'required|exists:plans,id',
            'name' => 'required|string|max:255',
            'target_amount' => 'required|numeric|min:1',
            'target_date' => 'required|date|after:today',
            'target_frequency' => 'nullable|in:daily,weekly,monthly',
        ]);

        $user = Auth::user();
        $plan = Plan::findOrFail($validated['plan_id']);
        // Check balance
        if ($user->balance < $plan->min_amount) {
            return response()->json(['message' => 'Insufficient balance to purchase this plan.'], 400);
        }
        $startAt = Carbon::now();
        $endAt = Carbon::parse($validated['target_date']);

        $nextProfitAt = match ($validated['target_frequency'] ?? $plan->profit_interval) {
            'daily' => $startAt->copy()->addDay(),
            'weekly' => $startAt->copy()->addWeek(),
            'monthly' => $startAt->copy()->addMonth(),
            default => $startAt->copy()->addDay(), // fallback
        };

        DB::beginTransaction();

        try {

            /** @var \App\Models\User $user */
            $user = Auth::user();
            // Deduct balance
            $user->balance -= $plan->min_amount;
            $user->save();

            // Save goal first
            $goal = Goal::create([
                'user_id' => $user->id,
                'name' => $validated['name'],
                'target_amount' => $validated['target_amount'],
                'target_date' => $validated['target_date'],
                'target_frequency' => $validated['target_frequency'],
                'achieved_amount' => $plan->min_amount,
                'plan_id' => $plan->id,
                'status' => 'active',
            ]);

            // Now save transaction and link to the goal
            $transaction = Transaction::create([
                'user_id' => $user->id,
                'plan_id' => $plan->id,
                'goal_id' => $goal->id,
                'amount' => $plan->min_amount,
                'type' => 'goal_investment',
                'description' => 'Initial investment for goal',
                'starts_at' => $startAt,
                'ends_at' => $endAt,
                'next_profit_at' => $nextProfitAt,
            ]);
            DB::commit();

            return response()->json([
                'message' => 'Goal saved and investment recorded successfully.',
                'goal' => $goal,
                'transaction' => $transaction,
                'updated_balance' => $user->balance
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json(['message' => 'Failed to save goal.'], 500);
        }
    }

    public function recommendPlansForGoal(Request $request)
    {
        $validated = $request->validate([
            'target_amount' => 'required|numeric|min:1',
            'target_date' => 'required|date|after:today',
            'target_frequency' => 'nullable|in:daily,weekly,monthly',
        ]);

        $user = Auth::user();

        $plans = Plan::where('min_amount', '<=', $user->balance)->get();

        return response()->json([
            'recommended_plans' => $plans
        ]);
    }

    public function handleQuestion(Request $request)
    {
        $user = User::findOrFail(Auth::id());
        $question = strtolower(trim($request->input('question')));

        $intent = $this->detectIntent($question);
        $response = $this->getResponseByIntent($intent, $question, $user);

        $this->storeInteraction($user, 'question', $question, $response);

        return response()->json(['response' => $response]);
    }

    private function detectIntent($question)
    {
        if (preg_match('/\bbalance\b|\bfunds\b|\baccount\b/', $question)) {
            return 'balance';
        }

        if (preg_match('/\binvest\b|\bplan\b|\breturn\b/', $question)) {
            return 'investment';
        }

        if (preg_match('/\bgoal\b|\bsave\b|\btarget\b/', $question)) {
            return 'goal_status';
        }

        if (preg_match('/\bset a goal\b/', $question)) {
            return 'create_goal';
        }

        if (preg_match('/\bcreate a goal\b/', $question)) {
            return 'start_goal';
        }

        return 'unknown';
    }

    private function getResponseByIntent($intent, $question, $user)
    {
        switch ($intent) {
            case 'balance':
                return $this->generateBalanceResponse($user);
            case 'investment':
                return $this->generateInvestmentResponse($user);
            case 'goal_status':
                return $this->generateGoalResponse($user);
            case 'create_goal':
                return $this->createGoalFromUserInput($question, $user);
            case 'start_goal':
                return $this->startGoalCreationProcess($user);
            default:
                return "Hmm, I didn’t quite catch that. You can ask me about your savings goals, current balance, or investment plans.";
        }
    }

    private function generateBalanceResponse($user)
    {
        $balance = $user->balance ?? 0;
        $totalEarnings = Earning::where('user_id', $user->id)->sum('amount');

        return [
            'balance' => $balance,
            'total_earnings' => $totalEarnings,
            'response' => "Your current balance is \$" . number_format($balance, 2) . ". Total earnings so far: \$" . number_format($totalEarnings, 2)
        ];
    }



    private function generateInvestmentResponse($user)
    {
        $balance = $user->balance;

        if ($balance < 100) {
            return "Your balance is too low for investment at the moment. Consider saving up more.";
        }

        $transactions = Transaction::where('user_id', $user->id)
            ->where('type', 'purchase_plan')
            ->get();

        if ($transactions->isEmpty()) {
            return "You haven't made any investments yet. Would you like to start investing?";
        }
        $investmentDetails = $transactions
            ->where('type', 'purchase_plan') // Filter only purchase plan transactions
            ->map(function ($transaction) {
                return "Invested \$" . number_format($transaction->amount, 2) . " in plan: " . optional($transaction->plan)->name;
            })
            ->implode(", ");

        return "Your investment history: " . $investmentDetails;
    }

    private function generateGoalResponse($user)
    {
        $goal = Goal::where('user_id', $user->id)->latest()->first();

        if ($goal) {
            $progress = $goal->achieved_amount;
            $target = $goal->target_amount;
            $remaining = $target - $progress;

            return "Your goal is to save \$" . number_format($target, 2) . ". You’ve saved \$" . number_format($progress, 2) . ", and you need \$" . number_format($remaining, 2) . " more to reach your goal.";
        }

        return "You don’t have any active goals yet. Would you like to create one?";
    }

    private function createGoalFromUserInput($question, $user)
    {
        preg_match('/\bset a goal\b for (.*) to save \$(\d+)(?: by (\d{4}-\d{2}-\d{2}))?/', $question, $matches);

        if (count($matches) < 3) {
            return "I couldn't quite understand your goal request. Please provide a goal name and the amount you'd like to save.";
        }

        $goalName = $matches[1];
        $targetAmount = (float)$matches[2];
        $targetDate = $matches[3] ?? null;

        $goal = Goal::create([
            'user_id' => $user->id,
            'name' => $goalName,
            'target_amount' => $targetAmount,
            'target_frequency' => 'once',
            'target_date' => $targetDate,
            'achieved_amount' => 0,
            'status' => 'active',
        ]);

        return "Great! I've set a goal for you to save \$" . number_format($targetAmount, 2) . " for '$goalName'. Your goal is set for $targetDate.";
    }

    private function startGoalCreationProcess($user)
    {
        $prompt = "Please tell me the name of the goal you'd like to create (e.g., Vacation, Emergency Fund).";
        $this->storeInteraction($user, 'goal_creation', 'ask_for_name', $prompt);
        return $prompt;
    }

   
    private function storeInteraction($user, $type, $content, $response)
    {
        // Ensure response is stored as a string
        $responseText = is_array($response) ? json_encode($response) : $response;

        Ai::create([
            'user_id' => $user->id,
            'interaction_type' => $type,
            'interaction_content' => $content,
            'response' => $responseText,
            'session_id' => session()->getId(),
            'metadata' => json_encode([]),
        ]);
    }
}
