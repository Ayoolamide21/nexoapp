@extends('layouts.admin')

@section('title', 'Active Investment Plans')

@section('content')
<div class="dashboard-main-body">
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <h6 class="fw-semibold mb-0">{{ $data['page_title'] }}</h6>
        <form method="GET" class="d-flex gap-2">
            <input type="text" name="search" placeholder="Search user" value="{{ request('search') }}" class="form-control">
            <button type="submit" class="btn btn-sm btn-primary">Search</button>
        </form>
    </div>

    <div class="card p-0 radius-12">
        <div class="card-body p-24">
            <div class="table-responsive scroll-sm">
                <table class="table bordered-table sm-table mb-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Plan</th>
                            <th>Amount</th>
                            <th>Started At</th>
                            <th>Status</th>
                            <th class="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($data['investments'] as $index => $investment)
                            <tr>
                                <td>{{ $data['investments']->firstItem() + $index }}</td>
                                <td>{{ $investment->user->name }}</td>
                                <td>{{ $investment->user->email }}</td>
                                <td>{{ $investment->plan->name }}</td>
                                <td>${{ number_format($investment->amount, 2) }}</td>
                                <td>{{ $investment->created_at->format('d M Y') }}</td>
                                <td>
    @php
        $status = $investment->status;
        $badgeClass = match ($status) {
            'active' => 'bg-success',
            'pending' => 'bg-warning',
            'completed' => 'bg-primary',
            'cancelled' => 'bg-danger',
            default => 'bg-secondary',
        };
    @endphp

    <span class="badge {{ $badgeClass }} text-capitalize">
        {{ $status }}
    </span>
</td>

                                <td class="text-center">
                                    <div class="d-flex justify-content-center gap-2">
                                        <button class="btn bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle editInvestmentBtn"
                                            data-bs-toggle="modal"
                                            data-bs-target="#editInvestmentModal"
                                            data-investment='@json($investment)'>
                                            <iconify-icon icon="lucide:edit"></iconify-icon>
                                        </button>
                                        <form method="POST" action="{{ route('admin.plans.user_active.delete', $investment->id) }}"
                                              onsubmit="return confirm('Delete this investment plan?');">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle">
                                                <iconify-icon icon="fluent:delete-24-regular"></iconify-icon>
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="8" class="text-center">No active plans found.</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            {{-- Pagination --}}
            @if ($data['investments']->hasPages())
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <span class="text-muted text-sm">
                        Showing {{ $data['investments']->firstItem() }} to {{ $data['investments']->lastItem() }} of {{ $data['investments']->total() }} entries
                    </span>
                    {{ $data['investments']->links() }}
                </div>
            @endif
        </div>
    </div>
</div>
<!-- Edit Investment Modal -->
<div class="modal fade" id="editInvestmentModal" tabindex="-1" aria-labelledby="editInvestmentModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <form method="POST" id="editInvestmentForm">
      @csrf
      @method('PUT')
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Investment</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <input type="hidden" name="investment_id" id="investmentId">
            
            <div class="mb-3">
                <label for="planAmount" class="form-label">Amount</label>
                <input type="number" name="amount" id="planAmount" class="form-control" required>
            </div>

            <div class="mb-3">
                <label for="planStatus" class="form-label">Status</label>
                <select name="status" id="planStatus" class="form-control" required>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="locked">Locked</option>
                </select>
            </div>

            <!-- Add more fields if needed -->
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary">Update Plan</button>
        </div>
      </div>
    </form>
  </div>
</div>
@endsection

@section('script')
<script>
document.addEventListener("DOMContentLoaded", function () {
    const editButtons = document.querySelectorAll(".editInvestmentBtn");
    const form = document.getElementById("editInvestmentForm");

    editButtons.forEach(button => {
        button.addEventListener("click", function () {
            const investment = JSON.parse(this.getAttribute("data-investment"));
            
            // Populate modal fields
            document.getElementById("investmentId").value = investment.id;
            document.getElementById("planAmount").value = investment.amount;
            document.getElementById("planStatus").value = investment.status;

            // Update form action
            form.action = `/admin/active/plans/${investment.id}`;
        });
    });
});
</script>
@endsection