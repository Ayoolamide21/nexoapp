@extends('layouts.admin')
@section('title', 'Languages')

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
            <li class="fw-medium">Settings - {{ $data['page_title'] }}</li>
        </ul>
    </div>

    <div class="card h-100 p-0 radius-12">
        <div class="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
            <button type="button" class="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#addLanguageModal">
                <iconify-icon icon="ic:baseline-plus" class="icon text-xl line-height-1"></iconify-icon>
                Add Language
            </button>
        </div>

        <div class="card-body p-24">
            <div class="table-responsive scroll-sm">
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

                <table class="table bordered-table sm-table mb-0">
                    <thead>
                        <tr>
                            <th>S.L</th>
                            <th class="text-center">Name</th>
                            <th class="text-center">Code </th>
                            <th class="text-center">Status</th>
                            <th class="text-center">Action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($data['languages'] as $index => $language)
                        <tr>
                            <td>{{ $data['languages']->firstItem() + $index }}</td>
                            <td class="text-center">
                                {{ $language->name }}
                                @if($language->is_default) (Default) @endif
                            </td>
                            <td>{{ $language->code }} </td>
                             <td>
                                    <div class="form-switch switch-primary d-flex align-items-center justify-content-center">
                                        <input class="form-check-input toggle-active" type="checkbox" role="switch" data-id="{{ $language->id }}" {{ $language->is_active ? 'checked' : '' }}>
                                    </div>
                                </td>
                           
                            <td class="text-center">
                                <button class="btn align-items-center justify-content-center bg-success-100 bg-hover-success-200 rounded-circle edit-language"
    data-id="{{ $language->id }}"
    data-name="{{ $language->name }}"
    data-code="{{ $language->code }}"
    data-status="{{ $language->is_active ? 1 : 0 }}"
    data-bs-toggle="modal"
    data-bs-target="#editLanguageModal">
    <iconify-icon icon="lucide:edit" class="menu-icon"></iconify-icon>
</button>
                                <button class="btn btn-danger btn-sm delete-language" data-id="{{ $language->id }}">
                                    <iconify-icon icon="fluent:delete-24-regular" class="menu-icon"></iconify-icon>
                                </button>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            <div class="mt-24 d-flex justify-content-between align-items-center">
                <span>Showing {{ $data['languages']->firstItem() }} to {{ $data['languages']->lastItem() }} of {{ $data['languages']->total() }} entries</span>
                {{ $data['languages']->links('pagination::bootstrap-5') }}
            </div>
        </div>
    </div>
</div>

<!-- Add Language Modal -->
<div class="modal fade" id="addLanguageModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content radius-16 bg-base">
            <div class="modal-header py-16 px-24 border-0">
                <h5 class="modal-title">Add New Language</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-24">
                <form id="addLanguageForm">
                    <div class="row">
                        <div class="col-6 mb-20">
                            <label class="form-label fw-semibold text-sm mb-8">Language Name</label>
                            <input type="text" class="form-control radius-8" id="name" placeholder="Enter Name">
                        </div>
                        <div class="col-6 mb-20">
    <label class="form-label fw-semibold text-sm mb-8">Language Code</label>
    <input type="text" class="form-control radius-8" id="code" placeholder="Enter Code (optional)">
</div>

                        <div class="col-6 mb-20">
                            <label class="form-label fw-semibold text-sm mb-8">Status</label>
                            <select class="form-control radius-8" id="status">
                                <option value="1">ON</option>
                                <option value="0">OFF</option>
                            </select>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center gap-3 mt-24">
                        <button type="reset" class="btn btn-outline-danger">Reset</button>
                        <button type="submit" class="btn btn-primary">Save Language</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Edit Language Modal -->
<div class="modal fade" id="editLanguageModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content radius-16 bg-base">
            <div class="modal-header py-16 px-24 border-0">
                <h5 class="modal-title">Edit Language</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-24">
                <form id="editLanguageForm" data-id="">
                    <div class="row">
                        <div class="col-6 mb-20">
                            <label class="form-label fw-semibold text-sm mb-8">Language Name</label>
                            <input type="text" class="form-control radius-8" id="editname">
                        </div>
                        <div class="col-6 mb-20">
    <label class="form-label fw-semibold text-sm mb-8">Language Code</label>
    <input type="text" class="form-control radius-8" id="editcode">
</div>

                        <div class="col-6 mb-20">
                            <label class="form-label fw-semibold text-sm mb-8">Status</label>
                            <select class="form-control radius-8" id="editstatus">
                                <option value="1">ON</option>
                                <option value="0">OFF</option>
                            </select>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center gap-3 mt-24">
                        <button type="reset" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Update Language</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

@endsection

@section('script')
<script>
    function showFlashMessage(message, isSuccess = true) {
    $('#ajax-flash-text').text(message);
    $('#ajax-flash-message')
        .removeClass('d-none alert-success alert-danger')
        .addClass(isSuccess ? 'alert-success' : 'alert-danger')
        .fadeIn();

    setTimeout(() => $('#ajax-flash-message').fadeOut(), 4000);
}

$(document).ready(function() {

    // Add Language
    $('#addLanguageForm').submit(function(e){
        e.preventDefault();
        let name = $('#name').val();
        let code = $('#code').val().trim();
        let status = $('#status').val();

        if (!code) {
            code = name.toLowerCase().slice(0, 2);
        }

        $.ajax({
            url: '{{ route("admin.language.store") }}',
            type: 'POST',
            data: {
                _token: '{{ csrf_token() }}',
                name: name,
                code: code,
                direction: 'ltr',
                is_active: status
            },
            success: function(res) {
    showFlashMessage(res.message, true);
    setTimeout(() => location.reload(), 1500);
},
error: function(xhr) {
    let message = xhr.responseJSON?.message || 'Something went wrong.';
    showFlashMessage(message, false);
}

        });
    });

    // Toggle Active
    $('.toggle-active').change(function(){
        let id = $(this).data('id');
        let is_active = $(this).prop('checked') ? 1 : 0;
        $.ajax({
            url: '/admin/languages/' + id,
            type: 'PUT',
            data: {
                _token: '{{ csrf_token() }}',
                is_active: is_active
            },
            success: function(res) {
    showFlashMessage(res.message, true);
    setTimeout(() => location.reload(), 1500);
},
        });
    });

    // Edit modal populate
    $('.edit-language').click(function(){
        let id = $(this).data('id');
        let name = $(this).data('name');
        let code = $(this).data('code');
        let status = $(this).data('status');

        $('#editname').val(name);
        $('#editcode').val(code);
        $('#editstatus').val(status);
        $('#editLanguageForm').attr('data-id', id);
    });

    // Edit Language AJAX
    $('#editLanguageForm').submit(function(e){
        e.preventDefault();
        let id = $(this).attr('data-id');
        let name = $('#editname').val();
        let code = $('#editcode').val().trim();
        let status = $('#editstatus').val();
if (!name || !code) {
            alert('Please fill in both name and code.');
            return;
        }
        $.ajax({
            url: '/admin/languages/' + id,
            type: 'PUT',
            data: {
                _token: '{{ csrf_token() }}',
                name: name,
                code: code,
                is_active: status
            },
            success: function(res){
    $('#ajax-flash-text').text(res.message);
    $('#ajax-flash-message')
        .removeClass('d-none alert-danger')
        .addClass('alert-success')
        .fadeIn();

    // Optional: clear form and close modal
    $('#addLanguageForm')[0].reset();
    $('#addLanguageModal').modal('hide');

    // Optionally, update your table dynamically or reload after short delay
    setTimeout(() => location.reload(), 1500);
},
error: function(xhr){
    let message = xhr.responseJSON?.message || 'Error adding language';
    $('#ajax-flash-text').text(message);
    $('#ajax-flash-message')
        .removeClass('d-none alert-success')
        .addClass('alert-danger')
        .fadeIn();
}

        });
    });

    // Delete Language
    $('.delete-language').click(function(){
        if(!confirm('Are you sure?')) return;
        let id = $(this).data('id');
        $.ajax({
            url: '/admin/languages/' + id,
            type: 'DELETE',
            data: { _token: '{{ csrf_token() }}' },
            success: function(res){
    $('#ajax-flash-text').text(res.message);
    $('#ajax-flash-message')
        .removeClass('d-none alert-danger')
        .addClass('alert-success')
        .fadeIn();

    // Optional: clear form and close modal
    $('#addLanguageForm')[0].reset();
    $('#addLanguageModal').modal('hide');
    

    // Optionally, update your table dynamically or reload after short delay
    setTimeout(() => location.reload(), 15000);
},
error: function(xhr){
    let message = xhr.responseJSON?.message || 'Error adding language';
    $('#ajax-flash-text').text(message);
    $('#ajax-flash-message')
        .removeClass('d-none alert-success')
        .addClass('alert-danger')
        .fadeIn();
}

        });
    });

});
</script>
@endsection
