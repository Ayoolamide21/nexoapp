@extends('layouts.admin')

@section('title', 'Pending Deposit Requests')

@section('content')
<div class="dashboard-main-body">
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <h6 class="fw-semibold mb-0">{{ $data['page_title'] }}</h6>
        <ul class="d-flex align-items-center gap-2">
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

    <div class="card h-100 p-0 radius-12">
        <div class="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
            <form method="GET" class="navbar-search" style="display:inline-block;">
                <input type="text" class="bg-base h-40-px w-auto" name="search" value="{{ request('search') }}" placeholder="Search by user or amount">
                <button type="submit" style="background:none; border:none;">
                    <iconify-icon icon="ion:search-outline" class="icon"></iconify-icon>
                </button>
            </form>
        </div>

        <div class="card-body p-24">
            <div class="table-responsive scroll-sm">
                <table class="table bordered-table sm-table mb-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Amount</th>
                            <th>Payment Method</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th class="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($data['deposits'] as $index => $deposit)
                            <tr>
                                <td>{{ $data['deposits']->firstItem() + $index }}</td>
                                <td>{{ $deposit->user->name ?? 'Unknown' }}</td>
                                <td>${{ number_format($deposit->amount, 2) }}</td>
                                <td>{{ ucfirst($deposit->payment_method ?? 'N/A') }}</td>
                                <td>{{ $deposit->created_at->format('d M Y, h:i A') }}</td>
                                <td>
                                    @if ($deposit->status === 'pending')
                                        <span class="badge bg-warning text-dark">Pending</span>
                                    @elseif ($deposit->status === 'completed')
                                        <span class="badge bg-success">Completed</span>
                                    @elseif ($deposit->status === 'rejected')
                                        <span class="badge bg-danger">Rejected</span>
                                    @else
                                        <span class="badge bg-secondary">{{ ucfirst($deposit->status) }}</span>
                                    @endif
                                </td>
                                <td class="text-center">
                                    <div class="d-flex align-items-center gap-10 justify-content-center">
                                        <form action="{{ route('admin.deposits.approve', $deposit->id) }}" method="POST" style="display:inline;">
                                            @csrf
                                            <button type="submit" class="btn btn-sm btn-success" title="Approve">
                                                <iconify-icon icon="mdi:check"></iconify-icon>
                                            </button>
                                        </form>

                                        <form action="{{ route('admin.deposits.reject', $deposit->id) }}" method="POST" style="display:inline;">
                                            @csrf
                                            <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Reject this deposit request?')" title="Reject">
                                                <iconify-icon icon="mdi:close"></iconify-icon>
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="7" class="text-center py-4 text-muted">
                                    <iconify-icon icon="mdi:bank-outline" class="me-1"></iconify-icon>
                                    No pending deposits found.
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            @if ($data['deposits']->hasPages())
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
        <div>
            <span class="text-sm text-muted">
                Showing {{ $data['deposits']->firstItem() ?? 0 }} to {{ $data['deposits']->lastItem() ?? 0 }} of {{ $data['deposits']->total() }} entries
            </span>
        </div>

        <ul class="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
            {{-- Previous Page Link --}}
            @if ($data['deposits']->onFirstPage())
                <li class="page-item disabled">
                    <a class="page-link bg-neutral-200 text-muted fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md" href="#">
                        <iconify-icon icon="ep:d-arrow-left"></iconify-icon>
                    </a>
                </li>
            @else
                <li class="page-item">
                    <a class="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md" href="{{ $data['deposits']->previousPageUrl() }}" rel="prev">
                        <iconify-icon icon="ep:d-arrow-left"></iconify-icon>
                    </a>
                </li>
            @endif

            {{-- Pagination Elements --}}
            @foreach ($data['deposits']->links()->elements[0] as $page => $url)
                @if ($page == $data['deposits']->currentPage())
                    <li class="page-item active">
                        <a class="page-link text-white fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md bg-primary-600" href="#">{{ $page }}</a>
                    </li>
                @else
                    <li class="page-item">
                        <a class="page-link text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md bg-neutral-200" href="{{ $url }}">{{ $page }}</a>
                    </li>
                @endif
            @endforeach

            {{-- Next Page Link --}}
            @if ($data['deposits']->hasMorePages())
                <li class="page-item">
                    <a class="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md" href="{{ $data['deposits']->nextPageUrl() }}" rel="next">
                        <iconify-icon icon="ep:d-arrow-right"></iconify-icon>
                    </a>
                </li>
            @else
                <li class="page-item disabled">
                    <a class="page-link bg-neutral-200 text-muted fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md" href="#">
                        <iconify-icon icon="ep:d-arrow-right"></iconify-icon>
                    </a>
                </li>
            @endif
        </ul>
    </div>
@endif
        </div>
    </div>
</div>
@endsection