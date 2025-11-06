<?php

namespace App\Services\Admin;

use App\Models\Transaction;
use App\Models\Withdrawal;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AdminDashboardService
{
  public function getDashboardData(): array
  {
    $today = Carbon::today();
    $yesterday = Carbon::yesterday();
    $startOfLastMonth = Carbon::now()->subMonth()->startOfMonth();
    $endOfLastMonth = Carbon::now()->subMonth()->endOfMonth();
    $startOfCurrentMonth = Carbon::now()->startOfMonth();
    $endOfCurrentMonth = Carbon::now()->endOfMonth();

    // Today's Deposit
    $todayDeposit = Transaction::where('status', 'completed')
      ->whereDate('created_at', $today)
      ->sum('amount');

    // Yesterday's Deposit
    $yesterdayDeposit = Transaction::where('status', 'completed')
      ->whereDate('created_at', $yesterday)
      ->sum('amount');

    if ($yesterdayDeposit == 0 && $todayDeposit > 0) {
      $changeLabel = 'New deposits today';
      $changeRounded = null;
      $changeIcon = 'ri-arrow-right-up-line';
      $changeColor = 'success';
    } elseif ($yesterdayDeposit == 0 && $todayDeposit == 0) {
      $changeLabel = 'No activity';
      $changeRounded = null;
      $changeIcon = 'ri-subtract-line';
      $changeColor = 'secondary';
    } else {
      $change = (($todayDeposit - $yesterdayDeposit) / $yesterdayDeposit) * 100;
      $changeRounded = round(abs($change));
      $changeLabel = $change > 0 ? "$changeRounded% increase" : "$changeRounded% decrease";
      $changeIcon = $change > 0 ? 'ri-arrow-right-up-line' : ($change < 0 ? 'ri-arrow-right-down-line' : 'ri-subtract-line');
      $changeColor = $change > 0 ? 'success' : ($change < 0 ? 'danger' : 'secondary');
    }

    // Active Investments for Last Month
    $activeInvestments = Transaction::where('type', 'purchase_plan')
      ->where('status', 'active')
      ->whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])
      ->count();
    Log::info('Active Investments Count for Last Month: ' . $activeInvestments);

    // Active Investments for Current Month
    $activeInvestmentsCurrentMonth = Transaction::where('type', 'purchase_plan')
      ->whereIn('status', ['active', 'locked'])
      ->whereBetween('created_at', [$startOfCurrentMonth, $endOfCurrentMonth])
      ->count();
    Log::info('Active Investments Count for Current Month: ' . $activeInvestmentsCurrentMonth);

    // Compare Active Investments (Current Month vs Last Month)
    $investmentChange = 0;
    if ($activeInvestments > 0) {
      $investmentChange = (($activeInvestmentsCurrentMonth - $activeInvestments) / $activeInvestments) * 100;
    }
    $investmentChangeRounded = round(abs($investmentChange));
    $investmentChangeLabel = $investmentChange > 0 ? "$investmentChangeRounded% increase" : ($investmentChange < 0 ? "$investmentChangeRounded% decrease" : 'No change');
    $investmentChangeIcon = $investmentChange > 0 ? 'ri-arrow-right-up-line' : ($investmentChange < 0 ? 'ri-arrow-right-down-line' : 'ri-subtract-line');
    $investmentChangeColor = $investmentChange > 0 ? 'success' : ($investmentChange < 0 ? 'danger' : 'secondary');

    // Total Deposit from last month
    $lastMonthDeposit = Transaction::where('type', 'deposit')
      ->whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])
      ->sum('amount');
    $currentMonthDeposit = Transaction::where('type', 'deposit')
      ->where('status', 'completed')
      ->whereBetween('created_at', [$startOfCurrentMonth, $endOfCurrentMonth])
      ->sum('amount');

    $depositChange = 0;
    if ($lastMonthDeposit > 0) {
      $depositChange = (($currentMonthDeposit - $lastMonthDeposit) / $lastMonthDeposit) * 100;
    }
    $depositChangeRounded = round(abs($depositChange));
    $depositChangeLabel = $depositChange > 0 ? "$depositChangeRounded% increase" : ($depositChange < 0 ? "$depositChangeRounded% decrease" : 'No change');
    $depositChangeIcon = $depositChange > 0 ? 'ri-arrow-right-up-line' : ($depositChange < 0 ? 'ri-arrow-right-down-line' : 'ri-subtract-line');
    $depositChangeColor = $depositChange > 0 ? 'success' : ($depositChange < 0 ? 'danger' : 'secondary');

    // Withdrawal Requests from last month
    $withdrawalRequests = Withdrawal::where('status', 'pending')->count();

    // Approved Withdrawals from last month
    $approvedWithdrawals = Transaction::where('type', 'withdrawal')
      ->where('status', 'approved')
      ->whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])
      ->count();

    return [
      'today_deposit' => $todayDeposit,
      'yesterday_deposit' => $yesterdayDeposit,
      'change' => $changeRounded,
      'changeLabel' => $changeLabel,
      'change_icon' => $changeIcon,
      'change_color' => $changeColor,
      'last_month_deposit' => $lastMonthDeposit,
      'current_month_deposit' => $currentMonthDeposit,
      'deposit_change_label' => $depositChangeLabel,
      'deposit_change_icon' => $depositChangeIcon,
      'deposit_change_color' => $depositChangeColor,
      'active_investments' => $activeInvestments,
      'active_investments_current_month' => $activeInvestmentsCurrentMonth,
      'investment_change_label' => $investmentChangeLabel,
      'investment_change_icon' => $investmentChangeIcon,
      'investment_change_color' => $investmentChangeColor,
      'withdrawal_requests' => $withdrawalRequests,
      'approved_withdrawals' => $approvedWithdrawals,
    ];
  }

  public function getEarningsAndWithdrawalsByRange(string $range = 'yearly'): array
  {
    $query = Transaction::query();

    switch ($range) {
      case 'daily':
        $dateFormat = 'H'; // group by hour
        $start = now()->startOfDay();
        $end = now()->endOfDay();
        break;

      case 'weekly':
        $dateFormat = 'w'; // day of week (0=Sunday, 6=Saturday)
        $start = now()->startOfWeek();
        $end = now()->endOfWeek();
        break;

      case 'monthly':
        $dateFormat = 'd'; // day of month
        $start = now()->startOfMonth();
        $end = now()->endOfMonth();
        break;

      case 'yearly':
      default:
        $dateFormat = 'm'; // month number
        $start = now()->startOfYear();
        $end = now()->endOfYear();
        break;
    }

    $earnings = Transaction::selectRaw("DATE_FORMAT(created_at, '%$dateFormat') as period, SUM(amount) as total")
      ->where('type', 'earning')
      ->where('status', 'active')
      ->whereBetween('created_at', [$start, $end])
      ->groupBy('period')
      ->orderBy('period')
      ->pluck('total', 'period')
      ->toArray();

    $withdrawals = Transaction::selectRaw("DATE_FORMAT(created_at, '%$dateFormat') as period, SUM(amount) as total")
      ->where('type', 'withdrawal')
      ->where('status', 'approved')
      ->whereBetween('created_at', [$start, $end])
      ->groupBy('period')
      ->orderBy('period')
      ->pluck('total', 'period')
      ->toArray();

    // Prepare the result arrays based on range
    $earningsData = [];
    $withdrawalsData = [];

    if ($range === 'daily') {
      // 24 hours
      for ($i = 0; $i < 24; $i++) {
        $key = str_pad($i, 2, '0', STR_PAD_LEFT);
        $earningsData[] = $earnings[$key] ?? 0;
        $withdrawalsData[] = $withdrawals[$key] ?? 0;
      }
    } elseif ($range === 'weekly') {
      // 7 days, Sunday=0
      for ($i = 0; $i <= 6; $i++) {
        $earningsData[] = $earnings[$i] ?? 0;
        $withdrawalsData[] = $withdrawals[$i] ?? 0;
      }
    } elseif ($range === 'monthly') {
      $daysInMonth = now()->daysInMonth;
      for ($i = 1; $i <= $daysInMonth; $i++) {
        $key = str_pad($i, 2, '0', STR_PAD_LEFT);
        $earningsData[] = $earnings[$key] ?? 0;
        $withdrawalsData[] = $withdrawals[$key] ?? 0;
      }
    } else { // yearly
      // 12 months
      for ($i = 1; $i <= 12; $i++) {
        $key = str_pad($i, 2, '0', STR_PAD_LEFT);
        $earningsData[] = $earnings[$key] ?? 0;
        $withdrawalsData[] = $withdrawals[$key] ?? 0;
      }
    }

    return [
      'earnings' => $earningsData,
      'withdrawals' => $withdrawalsData,
    ];
  }
}
