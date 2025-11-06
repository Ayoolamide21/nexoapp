<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Transaction;
use App\Models\Earning;
use Illuminate\Support\Carbon;

class ProcessEarnings extends Command
{
    protected $signature = 'earnings:process';
    protected $description = 'Process and apply periodic earnings to users based on their investments.';

    public function handle()
    {
        $now = Carbon::now();

        // Get all active transactions due for earnings or ended
        $transactions = Transaction::whereIn('status', ['active', 'locked'])
            ->where('next_profit_at', '<=', $now)
            ->with('plan', 'user')
            ->get();

        foreach ($transactions as $transaction) {
            $plan = $transaction->plan;
            $user = $transaction->user;

            if (!$plan || !$user) continue;

            // Calculate profit only if still within plan duration
            if ($now->lessThanOrEqualTo($transaction->ends_at)) {
                $profit = ($transaction->amount * $plan->profit_rate) / 100;

                // Update user's balance and transaction earnings
                $user->increment('balance', $profit);
                $transaction->increment('total_earnings', $profit);

                // Award loyalty points (1 point per $1 profit)
                $earnedPoints = floor($profit);
                $user->increment('loyalty_points', $earnedPoints);

                // Create earning record
                Earning::create([
                    'transaction_id' => $transaction->id,
                    'user_id' => $user->id,
                    'plan_id' => $plan->id,
                    'amount' => $profit,
                    'earned_at' => $now,
                ]);

                // Create transaction record for earnings (optional, if you need)
                Transaction::create([
                    'user_id' => $user->id,
                    'plan_id' => $plan->id,
                    'amount' => $profit,
                    'status' => $transaction->status,
                    'type' => 'earning',
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);

                // Update next profit date based on interval
                $nextProfitAt = $transaction->next_profit_at instanceof \Carbon\Carbon
                    ? $transaction->next_profit_at
                    : \Carbon\Carbon::parse($transaction->next_profit_at);

                $transaction->next_profit_at = match ($plan->profit_interval) {
                    'daily' => $nextProfitAt->copy()->addDay(),
                    'weekly' => $nextProfitAt->copy()->addWeek(),
                    'monthly' => $nextProfitAt->copy()->addMonth(),
                    default => null,
                };

                $transaction->save();

                $this->info("Processed earnings for Transaction #{$transaction->id}");
            }

            // Check if plan ended, mark completed and reinvest
            if ($now->greaterThanOrEqualTo($transaction->ends_at)) {
                // Mark old transaction as completed if not already done
                if ($transaction->status !== 'completed') {
                    $transaction->status = 'completed';
                    $transaction->save();
                }

                // Auto reinvest (create new transaction)
                $newStart = Carbon::parse($transaction->ends_at);
                $newEnd = $newStart->copy()->addDays((int)$plan->duration);


                $nextProfit = match ($plan->profit_interval) {
                    'daily' => $newStart->copy()->addDay(),
                    'weekly' => $newStart->copy()->addWeek(),
                    'monthly' => $newStart->copy()->addMonth(),
                    default => null,
                };

                if ($nextProfit) {
                    Transaction::create([
                        'user_id' => $user->id,
                        'plan_id' => $plan->id,
                        'amount' => $transaction->amount,
                        'status' => 'active',
                        'starts_at' => $newStart,
                        'ends_at' => $newEnd,
                        'type' => 'purchase_plan',
                        'next_profit_at' => $nextProfit,
                        'total_earnings' => 0,
                    ]);

                    $this->info("Auto reinvested plan_id {$plan->id} for user_id {$user->id}");
                } else {
                    $this->error("Invalid profit interval for plan_id {$plan->id}");
                }
            }
        }

        $this->info('Earnings processing and auto reinvest completed.');
    }
}