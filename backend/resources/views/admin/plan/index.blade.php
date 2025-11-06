@extends('layouts.admin')

@section('title', 'Investment Plans')

@section('content')
<div class="dashboard-main-body">
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <h6 class="fw-semibold mb-0">{{ $data['page_title'] ?? 'Investment Plans' }}</h6>
        <ul class="d-flex align-items-center gap-2">
            <li class="fw-medium">
                <a href="" class="d-flex align-items-center gap-1 hover-text-primary">
                    <iconify-icon icon="solar:home-smile-angle-outline" class="icon text-lg"></iconify-icon>
                    Dashboard
                </a>
            </li>
            <li>-</li>
            <li class="fw-medium text-muted">{{ $data['page_title'] ?? 'Investment Plans' }}</li>
        </ul>
    </div>

    <div class="card h-100 p-0 radius-12">
        <div class="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
            <div class="d-flex align-items-center flex-wrap gap-3">
                <span class="text-md fw-medium text-secondary-light mb-0">Show</span>
                <select class="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px" onchange="location = this.value;">
                    @for  ($i = 1; $i <= 10; $i++)
                        <option value="{{ request()->fullUrlWithQuery(['per_page' => $i]) }}"
                            {{ request('per_page') == $i ? 'selected' : '' }}>
                            {{ $i }}
                        </option>
                    @endfor
                </select>

                <form method="GET" class="navbar-search" style="display:inline-block;">
                    <input type="text" class="bg-base h-40-px w-auto" name="search" value="{{ request('search') }}" placeholder="Search Plans">
                    <button type="submit" style="background:none; border:none;">
                        <iconify-icon icon="ion:search-outline" class="icon"></iconify-icon>
                    </button>
                </form>

                <select class="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px" onchange="location = this.value;">
                    <option value="{{ request()->fullUrlWithQuery(['status' => null]) }}"
                        {{ request('status') === null ? 'selected' : '' }}>
                        Status
                    </option>
                    <option value="{{ request()->fullUrlWithQuery(['status' => 'active']) }}"
                        {{ request('status') === 'active' ? 'selected' : '' }}>
                        Active
                    </option>
                    <option value="{{ request()->fullUrlWithQuery(['status' => 'inactive']) }}"
                        {{ request('status') === 'inactive' ? 'selected' : '' }}>
                        Inactive
                    </option>
                </select>
            </div>

            <button class="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#addPlanModal">
                <iconify-icon icon="ic:baseline-plus" class="icon text-xl line-height-1"></iconify-icon>
                Add New Plan
            </button>
        </div>

        <div class="card-body p-24">
            <div class="table-responsive scroll-sm">
                <table class="table bordered-table sm-table mb-0">
                    <thead>
                        <tr>
                            <th scope="col">S.L</th>
                            <th scope="col">Name</th>
                            <th scope="col">Min Amount</th>
                            <th scope="col">Max Amount</th>
                            <th scope="col">Profit Rate</th>
                            <th scope="col">Interval</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Status</th>
                            <th scope="col" class="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($data['plans'] as $index => $plan)
                            <tr>
                                 <td>{{ $data['plans']->firstItem() + $index }}</td>
                                <td>{{ $plan->name }}</td>
                                <td>{{ $plan->min_amount }}</td>
                                <td>{{ $plan->max_amount }}</td>
                                <td>{{ $plan->profit_rate }}%</td>
                                <td>{{ ucfirst($plan->profit_interval) }}</td>
                                <td>{{ $plan->duration }}</td>
                                <td class="text-center">
                                    @if ($plan->status === 'active')
                                        <span class="bg-success-focus text-success-600 border border-success-main px-24 py-4 radius-4 fw-medium text-sm">Active</span>
                                    @else
                                        <span class="bg-neutral-200 text-neutral-600 border border-neutral-400 px-24 py-4 radius-4 fw-medium text-sm">Inactive</span>
                                    @endif
                                </td>
                                <td class="text-center">
                                    <div class="d-flex align-items-center gap-10 justify-content-center">
                                        <button
                                            class="btn bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle editPlanBtn"
                                            title="Edit"
                                            data-bs-toggle="modal"
                                            data-bs-target="#editPlanModal"
                                            data-plan='@json($plan)'>
                                            <iconify-icon icon="lucide:edit" class="menu-icon"></iconify-icon>
                                        </button>

                                        <form method="POST" action="{{ route('admin.plans.delete', $plan->id) }}"
                                            onsubmit="return confirm('Are you sure you want to delete this plan?');" style="display:inline;">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit"
                                                class="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                title="Delete">
                                                <iconify-icon icon="fluent:delete-24-regular" class="menu-icon"></iconify-icon>
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="9" class="text-center">No plans found.</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            @if ($data['plans']->hasPages())
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
        <div>
             <span class="text-sm text-muted">
        Showing {{ $data['plans']->firstItem() }} to {{ $data['plans']->lastItem() }} of {{ $data['plans']->total() }} entries
    </span>
        </div>

        <ul class="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
            {{-- Previous Page Link --}}
            @if ($data ['plans']->onFirstPage())
                <li class="page-item disabled">
                    <a class="page-link bg-neutral-200 text-muted fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md" href="#">
                        <iconify-icon icon="ep:d-arrow-left"></iconify-icon>
                    </a>
                </li>
            @else
                <li class="page-item">
                    <a class="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md" href="{{ $data['plans']->previousPageUrl() }}" rel="prev">
                        <iconify-icon icon="ep:d-arrow-left"></iconify-icon>
                    </a>
                </li>
            @endif

            {{-- Pagination Elements --}}
            @foreach ($data['plans']->links()->elements[0] as $page => $url)
                @if ($page == $data['plans']->currentPage())
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
            @if ($data['plans']->hasMorePages())
                <li class="page-item">
                    <a class="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md" href="{{ $data ['plans']->nextPageUrl() }}" rel="next">
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

@include('admin.plan._modals')

@endsection
