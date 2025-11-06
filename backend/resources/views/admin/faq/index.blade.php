@extends('layouts.admin')
@section('title', $data['page_title'])

@section('content')
<div class="dashboard-main-body">
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <!-- Page Heading -->
        <h6 class="fw-semibold mb-0">{{ $data['page_title'] }}</h6>
        <!-- Breadcrumb -->
        <ul class="d-flex align-items-center gap-2">
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

    @if (session('success'))
        <div id="flash-message" class="alert alert-success alert-dismissible fade show" role="alert">
            {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    @endif

    <div id="ajax-flash-message" class="alert alert-success alert-dismissible fade show d-none" role="alert">
        <span id="ajax-flash-text"></span>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>

    <div class="card h-100 p-0 radius-12">
        <div class="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
            

            <button class="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#addFaqModal">
                <iconify-icon icon="ic:baseline-plus" class="icon text-xl line-height-1"></iconify-icon>
                Add FAQ
            </button>
        </div>

        <div class="card-body p-24">
            <div class="table-responsive scroll-sm">
                <table class="table bordered-table sm-table mb-0">
                    <thead>
                        <tr>
                            <th scope="col">
                                <div class="d-flex align-items-center gap-10">
                                    S.L
                                </div>
                            </th>
                            <th scope="col">Question</th>
                            <th scope="col">Answer</th>
                            <th scope="col" class="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($data['faqs'] as $index => $faq)
                        <tr>
                            <td>
                                <div class="d-flex align-items-center gap-10">
                                    {{ $data['faqs']->firstItem() + $index }}
                                </div>
                            </td>
                            <td>{{ $faq->question }}</td>
                            <td>{{ $faq->answer }}</td>
                            <td class="text-center">
                                <div class="d-flex align-items-center gap-10 justify-content-center">
                                    <button class="btn bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle edit-faq"
                                        data-id="{{ $faq->id }}"
                                        data-question="{{ e($faq->question) }}"
                                        data-answer="{{ e($faq->answer) }}"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editFaqModal"
                                        title="Edit">
                                        <iconify-icon icon="lucide:edit" class="menu-icon"></iconify-icon>
                                    </button>

                                    <button type="button" class="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle delete-faq"
                                        data-id="{{ $faq->id }}" title="Delete">
                                        <iconify-icon icon="fluent:delete-24-regular" class="menu-icon"></iconify-icon>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="4" class="text-center">No FAQs found.</td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            {{-- Pagination --}}
            {{ $data['faqs']->links('pagination::bootstrap-5') }}
        </div>
    </div>
</div>

@include('admin.faq.modals')

@endsection

