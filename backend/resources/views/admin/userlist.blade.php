@extends('layouts.admin')

@section('title', 'User List')

@section('content')
<div class="dashboard-main-body">
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
  <!-- Page Heading -->
  <h6 class="fw-semibold mb-0">{{ $data['page_title'] }}</h6>
<!-- Breadcrumb -->
  <ul class="d-flex align-items-center gap-2">
    <!-- Home/Dashboard Link -->
    <li class="fw-medium">
      <a href="" class="d-flex align-items-center gap-1 hover-text-primary">
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
        <div class="d-flex align-items-center flex-wrap gap-3">
            <span class="text-md fw-medium text-secondary-light mb-0">Show</span>
            <select class="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px" onchange="location = this.value;">
                {{-- Pagination size change logic can be implemented with query param --}}
                @for ($i = 1; $i <= 10; $i++)
                    <option value="{{ request()->fullUrlWithQuery(['per_page' => $i]) }}" {{ request('per_page') == $i ? 'selected' : '' }}>
                        {{ $i }}
                    </option>
                @endfor
            </select>
            <form method="GET" class="navbar-search" style="display:inline-block;">
                <input type="text" class="bg-base h-40-px w-auto" name="search" value="{{ request('search') }}" placeholder="Search">
                <button type="submit" style="background:none; border:none;">
                    <iconify-icon icon="ion:search-outline" class="icon"></iconify-icon>
                </button>
            </form>
            <select class="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px" onchange="location = this.value;">
                <option value="{{ request()->fullUrlWithQuery(['status' => null]) }}" {{ request('status') == null ? 'selected' : '' }}>Status</option>
                <option value="{{ request()->fullUrlWithQuery(['status' => 'Active']) }}" {{ request('status') == 'Active' ? 'selected' : '' }}>Active</option>
                <option value="{{ request()->fullUrlWithQuery(['status' => 'Inactive']) }}" {{ request('status') == 'Inactive' ? 'selected' : '' }}>Inactive</option>
            </select>
        </div>
        <button class="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#addUserModal">
    <iconify-icon icon="ic:baseline-plus" class="icon text-xl line-height-1"></iconify-icon>
    Add New User
</button>
</div>
    <div class="card-body p-24">
        <div class="table-responsive scroll-sm">
            <table class="table bordered-table sm-table mb-0">
              <thead>
                <tr>
                  <th scope="col">
                    <div class="d-flex align-items-center gap-10">
                        <div class="form-check style-check d-flex align-items-center">
                            <input class="form-check-input radius-4 border input-form-dark" type="checkbox" name="checkbox" id="selectAll">
                        </div>
                        S.L
                    </div>
                  </th>
                  <th scope="col">Join Date</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Balance</th>
                  <th scope="col">Loyalty Points</th>
                  <th scope="col" class="text-center">Status</th>
                  <th scope="col" class="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                @forelse ($data['users'] as $index => $user)
                    <tr>
                        <td>
                            <div class="d-flex align-items-center gap-10">
                                <div class="form-check style-check d-flex align-items-center">
                                    <input class="form-check-input radius-4 border border-neutral-400" type="checkbox" name="checkbox" value="{{ $user->id }}">
                                </div>
                                {{ $data['users']->firstItem() + $index }}
                            </div>
                        </td>
                        <td>{{ $user->created_at->format('d M Y') }}</td>
                        <td>
                            <div class="d-flex align-items-center">
                                <img src="{{ $user->profile_photo_url ?? asset('assets/images/user-list/default-user.png') }}" alt="{{ $user->name }}" class="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden">
                                <div class="flex-grow-1">
                                    <span class="text-md mb-0 fw-normal text-secondary-light">{{ $user->name }}</span>
                                </div>
                            </div>
                        </td>
                        <td><span class="text-md mb-0 fw-normal text-secondary-light">{{ $user->email }}</span></td>
                        <td>${{ number_format($user->balance?? 'N/A') }}</td>
                        <td>{{ $user->loyalty_points ?? 'N/A' }}</td>
                        <td class="text-center">
                            @if($user->status === 'Active')
                                <span class="bg-success-focus text-success-600 border border-success-main px-24 py-4 radius-4 fw-medium text-sm">Active</span> 
                            @else
                                <span class="bg-neutral-200 text-neutral-600 border border-neutral-400 px-24 py-4 radius-4 fw-medium text-sm">Inactive</span> 
                            @endif
                        </td>
                        <td class="text-center"> 
                            <div class="d-flex align-items-center gap-10 justify-content-center">
                                <a href="" class="btn bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle" title="View"> 
                                    <iconify-icon icon="majesticons:eye-line" class="icon text-xl"></iconify-icon>
                                </a>
                               <button type="button" class="btn bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle editUserBtn" title="Edit" data-bs-toggle="modal" data-bs-target="#editUserModal" data-user='@json($user)'>
    <iconify-icon icon="lucide:edit" class="menu-icon"></iconify-icon> </button>

<form method="POST" action="{{ route('admin.user.delete', $user->id) }}" onsubmit="return confirm('Are you sure you want to delete this user?');" style="display:inline;">
    @csrf
    @method('DELETE')
    <button type="submit" class="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle" title="Delete"> 
        <iconify-icon icon="fluent:delete-24-regular" class="menu-icon"></iconify-icon>
    </button>
</form>

                            </div>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="8" class="text-center">No users found.</td></tr>
                @endforelse
              </tbody>
            </table>
        </div>
        @php
    $paginator = $data['users'];
@endphp

@if ($paginator->hasPages())
    <ul class="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center mt-3">
        {{-- Previous Page Link --}}
        @if ($paginator->onFirstPage())
            <li class="page-item disabled">
                <span class="page-link">Prev</span>
            </li>
        @else
            <li class="page-item">
                <a class="page-link" href="{{ $paginator->previousPageUrl() }}">Prev</a>
            </li>
        @endif

        {{-- Pagination Elements --}}
        @foreach ($paginator->getUrlRange(1, $paginator->lastPage()) as $page => $url)
            @if ($page == $paginator->currentPage())
                <li class="page-item active"><span class="page-link">{{ $page }}</span></li>
            @else
                <li class="page-item"><a class="page-link" href="{{ $url }}">{{ $page }}</a></li>
            @endif
        @endforeach

        {{-- Next Page Link --}}
        @if ($paginator->hasMorePages())
            <li class="page-item">
                <a class="page-link" href="{{ $paginator->nextPageUrl() }}">Next</a>
            </li>
        @else
            <li class="page-item disabled">
                <span class="page-link">Next</span>
            </li>
        @endif
    </ul>
@endif

    </div>
</div>
</div>

<!-- Add User Modal -->
<div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <form method="POST" action="{{ route('admin.adduser') }}">
        @csrf
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addUserModalLabel">Add New User</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body row g-3">
                <div class="col-md-6">
                    <label for="name" class="form-label">Full Name</label>
                    <input type="text" class="form-control" name="name" id="name" required>
                </div>
                <div class="col-md-6">
                    <label for="name" class="form-label">Username</label>
                    <input type="text" class="form-control" name="username" id="username" required>
                </div>
                <div class="col-md-6">
                    <label for="email" class="form-label">Email Address</label>
                    <input type="email" class="form-control" name="email" id="email" required>
                </div>
                <div class="col-md-6">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" name="password" id="password" required>
                </div>
                <div class="col-md-6">
                    <label for="status" class="form-label">Status</label>
                    <select class="form-select" name="status" id="status">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="balance" class="form-label">Balance</label>
                    <input type="number" step="0.01" class="form-control" name="balance" id="balance">
                </div>
                <div class="col-md-6">
                    <label for="loyalty_points" class="form-label">Loyalty Points</label>
                    <input type="number" class="form-control" name="loyalty_points" id="loyalty_points">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary">Create User</button>
            </div>
        </div>
    </form>
  </div>
</div>
<!-- Edit User Modal -->
<div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <form method="POST" action="" id="editUserForm">
        @csrf
        @method('PUT')
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editUserModalLabel">Edit User</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body row g-3">
                <input type="hidden" id="editUserId" name="user_id">

                <div class="col-md-6">
                    <label for="edit_name" class="form-label">Full Name</label>
                    <input type="text" class="form-control" name="name" id="edit_name" required>
                </div>
                <div class="col-md-6">
                    <label for="edit_email" class="form-label">Email Address</label>
                    <input type="email" class="form-control" name="email" id="edit_email" required>
                </div>
                <div class="col-md-6">
                    <label for="edit_status" class="form-label">Status</label>
                    <select class="form-select" name="status" id="edit_status">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="edit_balance" class="form-label">Balance</label>
                    <input type="number" step="0.01" class="form-control" name="balance" id="edit_balance">
                </div>
                <div class="col-md-6">
                    <label for="edit_loyalty_points" class="form-label">Loyalty Points</label>
                    <input type="number" class="form-control" name="loyalty_points" id="edit_loyalty_points">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-success">Update User</button>
            </div>
        </div>
    </form>
  </div>
</div>
<script>
    document.addEventListener('DOMContentLoaded', function () {
        const editButtons = document.querySelectorAll('.editUserBtn');
        const form = document.getElementById('editUserForm');

        editButtons.forEach(button => {
            button.addEventListener('click', function () {
                const user = JSON.parse(this.dataset.user);

                // Populate the form fields
                document.getElementById('edit_name').value = user.name;
                document.getElementById('edit_email').value = user.email;
                document.getElementById('edit_status').value = user.status;
                document.getElementById('edit_balance').value = user.balance ?? '';
                document.getElementById('edit_loyalty_points').value = user.loyalty_points ?? '';

                // Update form action to the correct user route
                form.action = `/admin/users/${user.id}`;
            });
        });
    });
</script>

@endsection