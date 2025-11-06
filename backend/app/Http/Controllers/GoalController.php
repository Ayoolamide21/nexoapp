<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use App\Models\Plan;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class GoalController extends Controller
{
    /**
     * Store a new goal
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'target_amount' => 'required|numeric|min:1',
            'target_date' => 'required|date|after:today',
            'target_frequency' => 'nullable|in:daily,weekly,monthly',
        ]);

        $goal = Goal::create([
            
            'user_id' => Auth::id(),
            'name' => $validated['name'],
            'target_amount' => $validated['target_amount'],
            'target_date' => $validated['target_date'],
            'target_frequency' => $validated['target_frequency'] ?? null,
            'status' => 'active',
        ]);

        return response()->json($goal, 201);
    }

    public function show($id)
    {
        $goal = Goal::with('transactions')->where('id', $id)->where('user_id', Auth::id())->firstOrFail();

        $invested = $goal->transactions->sum('amount');
        $percentage = $goal->target_amount > 0
            ? round(($invested / $goal->target_amount) * 100, 2)
            : 0;

        return response()->json([
            'goal' => $goal,
            'invested' => $invested,
            'progress_percent' => $percentage,
            'transactions' => $goal->transactions,
        ]);
    }
    // Controller method
    public function calculatePlanImpact(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'plan_id' => 'required|exists:plans,id',
            'target_amount' => 'required|numeric|min:1',
            'target_frequency' => 'nullable|in:daily,weekly,monthly',
            'target_date' => 'nullable|date|after:today',
            'name' => 'required|string|max:255',
        ]);

        $plan = Plan::findOrFail($validated['plan_id']);
        $targetAmount = $validated['target_amount'];
        $targetFrequency = $validated['target_frequency'] ?? $plan->profit_interval;
        $targetDate = isset($validated['target_date'])
            ? Carbon::parse($validated['target_date'])
            : Carbon::now()->addMonths(6);

        $intervals = match ($targetFrequency) {
            'daily' => Carbon::now()->diffInDays($targetDate),
            'weekly' => Carbon::now()->diffInWeeks($targetDate),
            'monthly' => Carbon::now()->diffInMonths($targetDate),
            default => 0,
        };

        if ($intervals === 0 || $plan->profit_rate <= 0 || $plan->min_amount <= 0) {
            return response()->json(['message' => 'Invalid plan or timeframe.'], 400);
        }

        $ratePerInterval = $plan->profit_rate / 100;
        $requiredInvestment = $targetAmount / pow(1 + $ratePerInterval, $intervals);

        $unitsNeeded = ceil($requiredInvestment / $plan->min_amount);
        $totalInvestment = $unitsNeeded * $plan->min_amount;
        if ($totalInvestment < $plan->min_amount || $totalInvestment > $plan->max_amount) {
            return response()->json([
                'message' => 'The required investment does not fall within the allowed range for this plan.',
                'required_investment' => round($totalInvestment, 2),
                'min_allowed' => $plan->min_amount,
                'max_allowed' => $plan->max_amount,
            ], 400);
        }


        if ($user->balance < $totalInvestment) {
            return response()->json(['message' => 'Insufficient balance for this investment.'], 400);
        }
        $nextProfitAt = match ($targetFrequency) {
            'daily' => Carbon::now()->addDay(),
            'weekly' => Carbon::now()->addWeek(),
            'monthly' => Carbon::now()->addMonth(),
            default => Carbon::now()->addDay(),
        };

        DB::beginTransaction();

        try {
            // Deduct balance
            /** @var \App\Models\User $user */
            $user->balance -= $totalInvestment;
            $user->save();

            //Create goal first
            $goal = Goal::create([
                'user_id' => $user->id,
                'name' => $validated['name'],
                'target_amount' => $targetAmount,
                'target_date' => $targetDate,
                'target_frequency' => $targetFrequency,
                'achieved_amount' => $totalInvestment,
                'plan_id' => $plan->id,
                'status' => 'active',
            ]);

            // Now create the transaction and link it to the goal
            $transaction = Transaction::create([
                'user_id' => $user->id,
                'plan_id' => $plan->id,
                'goal_id' => $goal->id,
                'amount' => $totalInvestment,
                'type' => 'goal_investment',
                'description' => 'Investment for goal: ' . $goal->name,
                'starts_at' => Carbon::now(),
                'ends_at' => $targetDate,
                'next_profit_at' => $nextProfitAt,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Goal created and investment deducted successfully.',
                'goal' => $goal,
                'transaction' => $transaction,
                'plan_summary' => [
                    'intervals' => $intervals,
                    'rate_per_interval' => round($ratePerInterval * 100, 2) . '%',
                    'required_investment' => round($requiredInvestment, 2),
                    'units_needed' => $unitsNeeded,
                    'total_investment' => round($totalInvestment, 2),
                ],
                'updated_balance' => $user->balance,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to create goal.'], 500);
        }
    }




    public function update(Request $request, $id)
    {
        $goal = Goal::where('id', $id)->where('user_id', Auth::id())->firstOrFail();

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'target_amount' => 'sometimes|numeric|min:1',
            'target_frequency' => 'nullable|string|in:daily,weekly,monthly',
            'target_date' => 'nullable|date|after_or_equal:today',
            'status' => 'nullable|in:active,completed,cancelled',
        ]);

        $goal->update($validated);

        return response()->json(['message' => 'Goal updated successfully', 'goal' => $goal]);
    }

    public function destroy($id)
    {
        $goal = Goal::where('id', $id)->where('user_id', Auth::id())->firstOrFail();

        $goal->delete();

        return response()->json(['message' => 'Goal deleted successfully']);
    }


    /**
     * Automatically assign plans to a goal by creating transactions
     */
    public function assignTransactionsToGoal(Request $request)
    {
        $validated = $request->validate([
            'goal_id' => 'required|exists:goals,id',
            'plan_id' => 'required|exists:plans,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $goal = Goal::where('id', $validated['goal_id'])->where('user_id', Auth::id())->firstOrFail();
        $plan = Plan::findOrFail($validated['plan_id']);
        $user = $request->user();

        $totalCost = $plan->min_amount * $validated['quantity'];

        if ($user->balance < $totalCost) {
            return response()->json(['message' => 'Insufficient balance.'], 422);
        }

        DB::beginTransaction();

        try {
            for ($i = 0; $i < $validated['quantity']; $i++) {
                $startDate = Carbon::now();
                $endDate = $startDate->copy()->addDays($plan->duration);

                $nextProfit = match ($plan->profit_interval) {
                    'daily' => $startDate->copy()->addDay(),
                    'weekly' => $startDate->copy()->addWeek(),
                    'monthly' => $startDate->copy()->addMonth(),
                    default => null,
                };

                Transaction::create([
                    'user_id' => $user->id,
                    'plan_id' => $plan->id,
                    'goal_id' => $goal->id,
                    'amount' => $plan->min_amount,
                    'status' => 'active',
                    'starts_at' => $startDate,
                    'ends_at' => $endDate,
                    'type' => 'purchase_plan',
                    'next_profit_at' => $nextProfit,
                    'total_earnings' => 0,
                ]);
            }

            $user->balance -= $totalCost;
            $user->save();

            DB::commit();

            return response()->json(['message' => 'Transactions assigned successfully']);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error assigning transactions: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Get all user goals with progress
     */
    public function userGoals()
    {
        $user = Auth::user();

        $goals = Goal::with(['transactions' => function ($query) {
            $query->whereIn('status', ['active', 'locked', 'completed']);
        }])
            ->where('user_id', $user->id)
            ->get()
            ->map(function ($goal) {
                $invested = $goal->transactions->sum('amount');
                $earnedSoFar = $goal->transactions->sum('total_earnings'); // profit earned so far

                $percentage = $goal->target_amount > 0
                    ? round(($earnedSoFar / $goal->target_amount) * 100, 2)
                    : 0;

                return [
                    'id' => $goal->id,
                    'name' => $goal->name,
                    'target_amount' => $goal->target_amount,
                    'invested' => $invested,
                    'earned' => $earnedSoFar,
                    'progress_percent' => $percentage,
                    'status' => $goal->status,
                    'target_frequency' => $goal->target_frequency,
                    'target_date' => $goal->target_date,
                    'created_at' => $goal->created_at,
                ];
            });

        return response()->json($goals);
    }
}
