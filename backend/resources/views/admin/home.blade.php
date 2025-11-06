@extends('layouts.admin')

@section('title', 'Dashboard')

@section('content')

<div class="dashboard-main-body">
<div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
  <!-- Page Heading -->
  <h6 class="fw-semibold mb-0">{{ $data['page_title'] }}</h6>
<!-- Breadcrumb -->
  <ul class="d-flex align-items-center gap-2">
    <!-- Home/Dashboard Link -->
    <li class="fw-medium">
      <a href="{{ route('admin.dashboard') }}" class="d-flex align-items-center gap-1 hover-text-primary">
        <iconify-icon icon="solar:home-smile-angle-outline" class="icon text-lg"></iconify-icon>
        Dashboard
      </a>
    </li>
    <li>-</li>
    <li class="fw-medium text-muted">{{ $data['page_title'] }}</li>
  </ul>
</div>

    
    <div class="row gy-4">
        <div class="col-12">
            <div class="card radius-12">
                <div class="card-body p-16">
                    <div class="row gy-4">
                        <div class="col-xxl-3 col-xl-4 col-sm-6">
                            <div class="px-20 py-16 shadow-none radius-8 h-100 gradient-deep-1 left-line line-bg-primary position-relative overflow-hidden">
                                <div class="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                                    <div>
                                        <span class="mb-2 fw-medium text-secondary-light text-md">Today's Deposit</span>
                                      <h6 class="fw-semibold mb-1">${{ number_format($data['today_deposit']) }}</h6>
                                    </div>
                                    <span class="w-44-px h-44-px radius-8 d-inline-flex justify-content-center align-items-center text-2xl mb-12 bg-primary-100 text-primary-600">
                                        <i class="ri-wallet-3-fill"></i>
                                    </span>
                                </div>
                                <p class="text-sm mb-0">
    @if (!isset($data['change']))
    <span class="text-muted">{{ $data['changeLabel'] ?? 'No activity' }}</span>
@else
    <span class="bg-{{ $data['change_color'] ?? 'secondary' }}-focus px-1 rounded-2 fw-medium text-{{ $data['change_color'] ?? 'secondary' }}-main text-sm">
        <i class="{{ $data['change_icon'] ?? 'ri-subtract-line' }}"></i> {{ $data['change'] }}%
    </span> From yesterday
@endif
</p>

                            </div>
                        </div>

                        <div class="col-xxl-3 col-xl-4 col-sm-6">
    <div class="px-20 py-16 shadow-none radius-8 h-100 gradient-deep-2 left-line line-bg-lilac position-relative overflow-hidden">
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
            <div>
                <span class="mb-2 fw-medium text-secondary-light text-md">Total Deposit</span>
                <h6 class="fw-semibold mb-1">${{ number_format($data['current_month_deposit'], 2) }}</h6>
            </div>
            <span class="w-44-px h-44-px radius-8 d-inline-flex justify-content-center align-items-center text-2xl mb-12 bg-lilac-200 text-lilac-600">
                <i class="ri-bank-card-fill"></i>
            </span>
        </div>
        <p class="text-sm mb-0">
            <span class="bg-{{ $data['deposit_change_color'] }}-focus px-1 rounded-2 fw-medium text-{{ $data['deposit_change_color'] }}-main text-sm">
                <i class="{{ $data['deposit_change_icon'] }}"></i> {{ $data['deposit_change_label'] }}
            </span> From last month
        </p>
    </div>
</div>

                        <div class="col-xxl-3 col-xl-4 col-sm-6">
                            <div class="px-20 py-16 shadow-none radius-8 h-100 gradient-deep-3 left-line line-bg-success position-relative overflow-hidden">
                                <div class="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                                    <div>
                                        <span class="mb-2 fw-medium text-secondary-light text-md">Active Investments</span>
                                        <h6 class="fw-semibold mb-1">{{ $data['active_investments_current_month'] }}</h6>
                                    </div>
                                    <span class="w-44-px h-44-px radius-8 d-inline-flex justify-content-center align-items-center text-2xl mb-12 bg-success-200 text-success-600">
                                        <i class="ri-line-chart-fill"></i>
                                    </span>
                                </div>
                                <p class="text-sm mb-0">

    @if (!isset($data['investment_change']))
        <span class="text-muted">{{ $data['investment_change_label'] }}</span>
    @else
        <span class="bg-{{ $data['investment_change_color'] }}-focus px-1 rounded-2 fw-medium text-{{ $data['investment_change_color'] }}-main text-sm">
            <i class="{{ $data['investment_change_icon'] }}"></i> {{ $data['investment_change'] }}%
        </span>From last month
    @endif   
  </p>
                            </div>
                        </div>
                        <div class="col-xxl-3 col-xl-4 col-sm-6">
    <div class="px-20 py-16 shadow-none radius-8 h-100 gradient-deep-4 left-line line-bg-warning position-relative overflow-hidden">
        
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
            <div>
                <span class="mb-2 fw-medium text-secondary-light text-md">Withdrawals</span>

                <!-- Pending Withdrawal Requests -->
                <h6 class="fw-semibold mb-1">
                    Pending: {{ $data['withdrawal_requests'] }}
                </h6>

                <!-- Approved Withdrawals -->
                <h6 class="fw-semibold mb-1 text-success">
                    Approved: {{ $data ['approved_withdrawals'] }}
                </h6>
            </div>

            <span class="w-44-px h-44-px radius-8 d-inline-flex justify-content-center align-items-center text-2xl mb-12 bg-warning-focus text-warning-600">
                <i class="ri-upload-cloud-fill"></i>
            </span>
        </div>

        <p class="text-sm mb-0">
            <span class="bg-{{ $data['change_color'] }}-focus px-1 rounded-2 fw-medium text-{{ $data['change_color'] }}-main text-sm">
                <i class="{{ $data['change_icon'] }}"></i> {{ $data['change'] }}%
            </span>
            From yesterday
        </p>

    </div>
</div>
</div>
</div>
            </div>
        </div>
        <div class="col-xxl-8">
    <div class="card h-100">
        <div class="card-body p-24 mb-8">
            <div class="d-flex align-items-center flex-wrap gap-2 justify-content-between">
                <h6 class="fw-bold text-lg mb-0">Earnings Vs Withdrawal</h6>
               <select id="timeRangeSelect" class="form-select form-select-sm w-auto bg-base border text-secondary-light">
    <option value="yearly" {{ $timeRange === 'yearly' ? 'selected' : '' }}>Yearly</option>
    <option value="monthly" {{ $timeRange === 'monthly' ? 'selected' : '' }}>Monthly</option>
    <option value="weekly" {{ $timeRange === 'weekly' ? 'selected' : '' }}>Weekly</option>
    <option value="daily" {{ $timeRange === 'daily' ? 'selected' : '' }}>Daily</option>
</select>

            </div>
            <ul class="d-flex flex-wrap align-items-center justify-content-center my-3 gap-24">
                <li class="d-flex flex-column gap-1">
                    <div class="d-flex align-items-center gap-2">
                        <span class="w-8-px h-8-px rounded-pill bg-primary-600"></span>
                        <span class="text-secondary-light text-sm fw-semibold">Earning </span>
                    </div>
                    <div class="d-flex align-items-center gap-8">
                        <h6 class="mb-0">${{ number_format(array_sum($chartData['earnings']), 2) }}</h6>
                        <!-- You can calculate change dynamically as well -->
                    </div>
                </li>
                <li class="d-flex flex-column gap-1">
                    <div class="d-flex align-items-center gap-2">
                        <span class="w-8-px h-8-px rounded-pill bg-warning-600"></span>
                        <span class="text-secondary-light text-sm fw-semibold">Withdrawal </span>
                    </div>
                    <div class="d-flex align-items-center gap-8">
                        <h6 class="mb-0">${{ number_format(array_sum($chartData['withdrawals']), 2) }}</h6>
                    </div>
                </li>
            </ul>
            <div id="incomeExpense"></div>
        </div>
    </div>
</div>
        <div class="col-xxl-4 col-md-6">
    <div class="card">
        <div class="card-header border-bottom">
            <div class="d-flex align-items-center flex-wrap gap-2 justify-content-between">
                <h6 class="mb-2 fw-bold text-lg">Users</h6>
                <a href="{{ route('admin.userlist') }}" class="text-primary-600 hover-text-primary d-flex align-items-center gap-1">
                    View All
                    <iconify-icon icon="solar:alt-arrow-right-linear" class="icon"></iconify-icon>
                </a>
            </div>
        </div>
        <div class="card-body p-20">
            <div class="d-flex flex-column gap-24">
                @forelse ($data['users'] as $user)
                    <div class="d-flex align-items-center justify-content-between gap-3">
                        <div class="d-flex align-items-center">
                            {{-- <img src="{{ $user->profile_photo_url ?? asset('assets/images/user-grid/default-user.png') }}" 
                                alt="{{ $user->name }}" 
                                class="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"> --}}
                            <div class="flex-grow-1">
                                <h6 class="text-md mb-0">{{ $user->name }}</h6>
                                <span class="text-sm text-secondary-light fw-normal">{{ $user->email?? 'User' }}</span>
                            </div>
                        </div>
                        <span class="text-success-main fw-medium text-md">{{ ucfirst($user->status ?? 'Active') }}</span>
                    </div>
                @empty
                    <p>No users found.</p>
                @endforelse
            </div>

            {{-- Pagination links --}}
            <div class="mt-3">
                {{ $data['users']->links() }}
            </div>
        </div>
    </div>
</div>

      
    </div>
  </div>
@endsection