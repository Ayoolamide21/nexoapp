@extends('layouts.admin')

@section('title', 'Withdrawal History')

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
                            <th>Withdrawal Method</th>
                            <th>Date</th>
                            <th>Details</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($data['withdrawals'] as $index => $withdrawal)
                            <tr>
                                <td>{{ $data['withdrawals']->firstItem() + $index }}</td>
                                <td>{{ $withdrawal->user->name ?? 'Unknown' }}</td>
                                <td>${{ number_format($withdrawal->amount, 2) }}</td>
                                <td>{{ ucfirst($withdrawal->withdrawal_method ?? 'N/A') }}</td>
                                <td>{{ $withdrawal->created_at->format('d M Y, h:i A') }}</td>
                                <td>
    <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#withdrawalDetailsModal{{ $withdrawal->id }}">
        <iconify-icon icon="mdi:eye"></iconify-icon> View
    </button>

    <!-- Hidden JSON data, we'll show it in modal -->
    <input type="hidden" id="destination-data-{{ $withdrawal->id }}" value='@json($withdrawal->destination)'>
</td>

                                <td>
                                    @if ($withdrawal->status === 'pending')
                                        <span class="badge bg-warning text-dark">Pending</span>
                                    @elseif ($withdrawal->status === 'completed')
                                        <span class="badge bg-success">Completed</span>
                                    @elseif ($withdrawal->status === 'rejected')
                                        <span class="badge bg-danger">Rejected</span>
                                    @else
                                        <span class="badge bg-secondary">{{ ucfirst($withdrawal->status) }}</span>
                                    @endif
                                </td>
                                <td>
                                    <form action="{{ route('admin.withdrawals.destroy', $withdrawal->id) }}" method="POST" onsubmit="return confirm('Are you sure you want to delete this withdrawal?');">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle">
                                            <iconify-icon icon="mdi:delete-outline"></iconify-icon>
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="7" class="text-center py-4 text-muted">
                                    <iconify-icon icon="mdi:bank-outline" class="me-1"></iconify-icon>
                                    No withdrawal history found.
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
@foreach ($data['withdrawals'] as $withdrawal)
<div class="modal fade" id="withdrawalDetailsModal{{ $withdrawal->id }}" tabindex="-1" aria-labelledby="withdrawalDetailsLabel{{ $withdrawal->id }}" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="withdrawalDetailsLabel{{ $withdrawal->id }}">Withdrawal Destination Details</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        @php
            $destination = json_decode($withdrawal->destination, true);
        @endphp

        @if (is_array($destination))
            @if (isset($destination['bankName']))
                <p><strong>Bank Name:</strong> {{ $destination['bankName'] }}</p>
                <p><strong>Account Number:</strong> {{ $destination['accountNumber'] }}</p>
                <p><strong>Swift Code:</strong> {{ $destination['swiftCode'] }}</p>
            @elseif (isset($destination['currency']))
                <p><strong>Currency:</strong> {{ $destination['currency'] }}</p>
                <p><strong>Network:</strong> {{ $destination['network'] }}</p>
                <p><strong>Address:</strong> {{ $destination['address'] }}</p>
            @else
                <pre>{{ $withdrawal->destination }}</pre>
            @endif
        @else
            <pre>{{ $withdrawal->destination }}</pre>
        @endif
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
@endforeach

            @if ($data['withdrawals']->hasPages())
                <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
                    <div>
                        <span class="text-sm text-muted">
                            Showing {{ $data['withdrawals']->firstItem() ?? 0 }} to {{ $data['withdrawals']->lastItem() ?? 0 }} of {{ $data['withdrawals']->total() }} entries
                        </span>
                    </div>

                    <ul class="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
                        {{-- Previous Page Link --}}
                        @if ($data['withdrawals']->onFirstPage())
                            <li class="page-item disabled">
                                <a class="page-link bg-neutral-200 text-muted fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md" href="#">
                                    <iconify-icon icon="ep:d-arrow-left"></iconify-icon>
                                </a>
                            </li>
                        @else
                            <li class="page-item">
                                <a class="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md" href="{{ $data['withdrawals']->previousPageUrl() }}" rel="prev">
                                    <iconify-icon icon="ep:d-arrow-left"></iconify-icon>
                                </a>
                            </li>
                        @endif

                        {{-- Pagination Elements --}}
                        @foreach ($data['withdrawals']->links()->elements[0] as $page => $url)
                            @if ($page == $data['withdrawals']->currentPage())
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
                        @if ($data['withdrawals']->hasMorePages())
                            <li class="page-item">
                                <a class="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md" href="{{ $data['withdrawals']->nextPageUrl() }}" rel="next">
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
