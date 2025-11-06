@extends('layouts.admin')

@section('title', 'Edit Payment Gateway')

@section('content')
<div class="dashboard-main-body">
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <h6 class="fw-semibold mb-0">Settings</h6>
        <ul class="d-flex align-items-center gap-2">
            <li class="fw-medium">
                <a href="{{ route('admin.dashboard') }}" class="d-flex align-items-center gap-1 hover-text-primary">
                    <iconify-icon icon="solar:home-smile-angle-outline" class="icon text-lg"></iconify-icon>
                    Dashboard
                </a>
            </li>
            <li>-</li>
            <li class="fw-medium">{{ $data['page_title'] }}</li>
        </ul>
    </div>  
    <form action="{{ route('admin.payment_gateways.update', $data['gateway']->id) }}" method="POST" enctype="multipart/form-data">
        @csrf

        <div class="mb-3">
            <label for="status" class="form-label">Enable Gateway</label>
            <input type="checkbox" name="status" id="status" value="1" {{ $data['gateway']->status ? 'checked' : '' }}>
        </div>

        <div class="mb-3">
            <label for="environment" class="form-label">Environment</label>
            <select name="environment" id="environment" class="form-control">
                <option value="sandbox" {{ $data['gateway']->environment == 'sandbox' ? 'selected' : '' }}>Sandbox</option>
                <option value="production" {{ $data['gateway']->environment == 'production' ? 'selected' : '' }}>Production</option>
                <option value="both" {{ $data['gateway']->environment == 'both' ? 'selected' : '' }}>Both</option>
            </select>
        </div>

        <div class="mb-3">
            <label for="currency" class="form-label">Currency</label>
            <select name="currency" id="currency" class="form-control">
                <option value="USD" {{ $data['gateway']->currency == 'USD' ? 'selected' : '' }}>USD</option>
                <option value="TK" {{ $data['gateway']->currency == 'TK' ? 'selected' : '' }}>TK</option>
                <option value="Rupee" {{ $data['gateway']->currency == 'Rupee' ? 'selected' : '' }}>Rupee</option>
            </select>
        </div>

        <div class="mb-3">
            <label for="public_key" class="form-label">Public Key</label>
            <input type="text" class="form-control" id="public_key" name="public_key" value="{{ old('public_key', $data['gateway']->public_key) }}">
        </div>

        <div class="mb-3">
            <label for="secret_key" class="form-label">Secret Key</label>
            <input type="text" class="form-control" id="secret_key" name="secret_key" value="{{ old('secret_key', $data['gateway']->secret_key) }}">
        </div>

        <div class="mb-3">
            <label for="logo" class="form-label">Logo</label>
            <input type="file" class="form-control" id="logo" name="logo">
            @if($data['gateway']->logo)
                <img src="{{ asset('storage/' . $data['gateway']->logo) }}" alt="Logo" style="max-height: 100px; margin-top:10px;">
            @endif
        </div>

        <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
</div>
@endsection
