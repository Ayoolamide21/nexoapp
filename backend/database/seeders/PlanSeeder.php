<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Plan;

class PlanSeeder extends Seeder
{
    public function run()
    {
        $plans = [
            [
                'name' => 'Starter Plan',
                'min_amount' => 100.00,
                'max_amount' => 1000.00,
                'description' => 'Perfect for beginners looking to start small.',
                'interest_rate' => 5.00,
                'interest_interval' => 'daily',
                'status' => 'active',
            ],
            [
                'name' => 'Growth Plan',
                'min_amount' => 1000.00,
                'max_amount' => 5000.00,
                'description' => 'Designed for steady portfolio growth.',
                'interest_rate' => 7.50,
                'interest_interval' => 'weekly',
                'status' => 'active',
            ],
            [
                'name' => 'Pro Plan',
                'min_amount' => 5000.00,
                'max_amount' => 20000.00,
                'description' => 'For experienced traders seeking higher returns.',
                'interest_rate' => 10.00,
                'interest_interval' => 'monthly',
                'status' => 'active',
            ],
            [
                'name' => 'Elite Plan',
                'min_amount' => 20000.00,
                'max_amount' => 100000.00,
                'description' => 'Premium investment plan with maximum benefits.',
                'interest_rate' => 15.00,
                'interest_interval' => 'monthly',
                'status' => 'inactive',
            ]
        ];

        foreach ($plans as $plan) {
            Plan::create($plan);
        }
    }
}
