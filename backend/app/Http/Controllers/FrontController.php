<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Models\Settings;
use App\Models\Currency;
use App\Models\Language;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;

class FrontController extends Controller
{
    public function index()
    {
        $settings = Cache::remember('app.settings', 60, fn() => Settings::all()->pluck('value', 'key'));


        // Default selected currency
        $currency = Currency::where('code', $settings['app.currency'] ?? 'USD')
            ->first(['code', 'name', 'symbol']) ?: (object)[
                'code' => 'USD',
                'name' => 'US Dollar',
                'symbol' => '$',
            ];

        // Default selected language
        $language = Language::where('code', $settings['app.language'] ?? 'en')
            ->first(['code', 'name', 'direction']) ?: (object)[
                'code' => 'en',
                'name' => 'English',
                'direction' => 'ltr',
            ];

        $response = [
            'sitename'           => $settings['app.site_name'] ?? 'MyApp',
            'logo'               => $settings['app.logo'] ?? null,
            'favicon'            => $settings['app.favicon'] ?? null,
            'homepage_url'       => $settings['app.redirect_homepage_url'] ?? '',
            'announcement'       => $settings['app.announcement'] ?? '',
            'about_us'           => $settings['app.about_us'] ?? '',
            'company_email'      => $settings['app.company_email'] ?? '',
            'company_phone'      => $settings['app.company_phone'] ?? '',
            'menu'               => json_decode($settings['app.menu'] ?? '[]', true),
            'currency'           => $currency,
            'language'           => $language,
            'allow_register'     => filter_var($settings['app.allow_user_register'] ?? true, FILTER_VALIDATE_BOOLEAN),

            // New: Full list of active currencies
            'available_currencies' => Currency::where('is_active', true)
                ->get(['code', 'name as label', 'symbol']),

            //New: Full list of active languages
            'available_languages' => Language::where('is_active', true)
                ->get(['code', 'name as label', 'direction']),
        ];

        if (Auth::check()) {
            $response['user_settings'] = [
                'trade_mode'  => filter_var($settings['app.trade_mode'] ?? true, FILTER_VALIDATE_BOOLEAN),
                'withdrawals' => filter_var($settings['app.withdrawals'] ?? true, FILTER_VALIDATE_BOOLEAN),
            ];
        }

        return response()->json($response);
    }

    public function planFront(Request $request)
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
}
