<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Models\Plan;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Earning;


class PlanController extends Controller
{   
    public function index(Request $request)
    {
        $category = $request->query('category');
        
        $intervalDays = [
            'daily' => 1,
            'weekly' => 7,
            'monthly' => 30,
        ];

        $query = Plan::select(
            'plans.id',
            'name',
            'min_amount',
            'max_amount',
            'profit_rate',
            'profit_interval',
            'duration',
            'category',
            'status',
            'referral_bonus',
            'bonus_on_upgrade'
        );

       // )->where('status', 'active');

        // If category filter provided, apply it
        if ($category) {
            $query->where('category', $category);
        }

        $plans = $query->get()->map(function ($plan) use ($intervalDays) {
            // Get number of days per profit interval, default 1 if not found
            $daysPerInterval = $intervalDays[$plan->profit_interval] ?? 1;

            // Calculate how many intervals fit in the duration
            $intervalCount = $plan->duration / $daysPerInterval;

            // Calculate expected yield: profit_rate * number of intervals
            $expectedYield = $plan->profit_rate * $intervalCount;
            return [
                'id' => $plan->id,
                'name' => $plan->name,
                'price' => '$' . number_format($plan->min_amount, 2) . ' - $' . number_format($plan->max_amount, 2),
                'change' => $plan->profit_rate . '% ' . ucfirst($plan->profit_interval),
                'expected_yield' => number_format($expectedYield, 2) . '%',
                'duration' => $plan->duration . ' days',
                'status' => $plan->status,
                'category' => $plan->category,
                'min_amount' => $plan->min_amount,
                'max_amount' => $plan->max_amount,
                'referral_bonus' => $plan->referral_bonus,
                'bonus_on_upgrade' => $plan->bonus_on_upgrade,
            ];
            });

        return response()->json($plans);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'min_amount' => 'required|numeric|min:0',
            'max_amount' => 'required|numeric|gte:min_amount',
            'description' => 'nullable|string',
            'duration' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'profit_rate' => 'required|numeric|min:0',
            'profit_interval' => 'required|in:daily,weekly,monthly',
            'status' => 'required|in:active,inactive',
        ]);

        $plan = Plan::create($validated);

        return response()->json($plan, 201);
    }

    public function invest(Request $request)
    {
        $request->validate([
            'plan_id' => 'required|exists:plans,id',
            'amount' => 'required|numeric|min:1',
        ]);

        $user = User::findOrFail(Auth::id());
        $plan = Plan::findOrFail($request->plan_id);

        if ($plan->status !== 'active') {
            return response()->json(['message' => 'Plan is not active.'], 400);
        }

        if ($request->amount < $plan->min_amount || $request->amount > $plan->max_amount) {
            return response()->json(['message' => 'Invalid investment amount.'], 422);
        }

        if ($user->balance < $request->amount) {
            return response()->json(['message' => 'Insufficient balance.'], 422);
        }

        if (!is_numeric($plan->duration) || $plan->duration <= 0) {
            return response()->json(['message' => 'Invalid plan duration.'], 422);
        }

        // Deduct user's balance
        
        $user->balance -= $request->amount;
        $user->save();

        // Define start and end dates
        $startDate = Carbon::now();
        $endDate = $startDate->copy()->addDays((int) $plan->duration);
        

        // Calculate next profit date
        $nextProfit = match ($plan->profit_interval) {
            'daily' => $startDate->copy()->addDay(),
            'weekly' => $startDate->copy()->addWeek(),
            'monthly' => $startDate->copy()->addMonth(),
            default => null,
        };

        if (!$nextProfit) {
            return response()->json(['message' => 'Invalid profit interval.'], 422);
        }

        // Create transaction
        Transaction::create([
            'user_id' => $user->id,
            'plan_id' => $plan->id,
            'amount' => $request->amount,
            'status' => 'active',
            'starts_at' => $startDate,
            'ends_at' => $endDate,
            'type' => 'purchase_plan',
            'next_profit_at' => $nextProfit,
            'total_earnings' => 0,
        ]);

        return response()->json(['message' => 'Investment successful']);
    }
        public function userPurchasedPlans(Request $request)
    {
        $user = $request->user();

        // Fetch transactions with related plan
        $transactions = Transaction::with(['plan:id,name,category']) // Only select necessary fields from plans
            ->where('user_id', $user->id)
            ->whereIn('status', ['active', 'completed', 'locked', 'cancelled'])
            ->where('type', 'purchase_plan')
            ->orderByDesc('created_at')
            ->get()
            ->map(function ($tx) {
                return [
                    'id' => $tx->id,
                    'plan_name' => $tx->plan->name ?? 'Unknown Plan',
                    'category' => $tx->plan->category ?? 'Unknown Category',
                    'amount' => (float) $tx->amount,
                    'status' => $tx->status,
                    'starts_at' => $tx->starts_at,
                    'ends_at' => $tx->ends_at,
                    'total_earnings' => (float) $tx->total_earnings,
                    'next_profit_at' => $tx->next_profit_at,
                ];
            });


        return response()->json($transactions);
    }
    public function lockPlan($id, Request $request)
    {
        $user = $request->user();

        $transaction = Transaction::where('id', $id)
            ->where('user_id', $user->id)
            ->where('status', 'active')
            ->firstOrFail();

        $transaction->status = 'locked';
        $transaction->save();

        return response()->json(['message' => 'Plan locked successfully']);
    }

    public function calculateEarnings()
    {
        $now = Carbon::now();

        $transactions = Transaction::where('status', 'active')
            ->where('next_profit_at', '<=', $now)
            ->where('ends_at', '>', $now)
            ->get();

        foreach ($transactions as $transaction) {
            $plan = Plan::find($transaction->plan_id);
            if (!$plan) continue;

            $earningAmount = ($transaction->amount * $plan->profit_rate) / 100;

            // Create earning record
            Earning::create([
                'transaction_id' => $transaction->id,
                'user_id' => $transaction->user_id,
                'plan_id' => $plan->id,
                'amount' => $earningAmount,
                'earned_at' => $now,
            ]);

            Transaction::create([
                'user_id' => $transaction->user_id,
                'amount' => $earningAmount,
                'type' => 'earning',
                'status' => 'completed',
                'reference' => (string)$transaction->id,
            ]);

            // Update total earnings
            $transaction->total_earnings += $earningAmount;

            // Move next profit date forward by interval
            $transaction->next_profit_at = match ($plan->profit_interval) {
                'daily' => $transaction->next_profit_at->copy()->addDay(),
                'weekly' => $transaction->next_profit_at->copy()->addWeek(),
                'monthly' => $transaction->next_profit_at->copy()->addMonth(),
                default => $transaction->next_profit_at->copy()->addDay(),
            };

            // Check if investment has matured
            if ($transaction->next_profit_at >= $transaction->ends_at) {
                $transaction->status = 'completed';
            }

            $transaction->save();
        }

        return response()->json([
            'message' => 'Earnings processed for ' . count($transactions) . ' transactions.',
        ]);
    }

}
