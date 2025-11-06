@extends('layouts.admin')

@section('title', 'Email Settings')

@section('content')

<div class="dashboard-main-body">
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <h6 class="fw-semibold mb-0">Email Settings</h6>
        <ul class="d-flex align-items-center gap-2">
            <li class="fw-medium">
                <a href="{{ route('admin.dashboard') }}" class="d-flex align-items-center gap-1 hover-text-primary">
                    <iconify-icon icon="solar:home-smile-angle-outline" class="icon text-lg"></iconify-icon>
                    Dashboard
                </a>
            </li>
            <li>-</li>
            <li class="fw-medium">Settings - Email</li>
        </ul>
    </div>

    <div class="card h-100 p-0 radius-12 overflow-hidden">
        <div class="card-body p-40">
            <form action="{{ route('admin.settings.email.update') }}" method="POST">
                @csrf
                <div class="row">

                    <div class="col-sm-6">
    <div class="mb-20">
        <label for="email_mailer" class="form-label fw-semibold text-primary-light text-sm mb-8">Mail Driver</label>
        <select name="email.mailer" id="email_mailer" class="form-control radius-8">
            @php
                $drivers = ['smtp' => 'SMTP', 'mailgun' => 'Mailgun', 'sendmail' => 'Sendmail', 'log' => 'Log'];
                $selected = old('email.mailer', $data['email']['mailer'] ?? 'smtp');
            @endphp

            @foreach($drivers as $key => $label)
                <option value="{{ $key }}" {{ $selected === $key ? 'selected' : '' }}>
                    {{ $label }}
                </option>
            @endforeach
        </select>
    </div>
</div>
<div class="col-sm-6">
                        <div class="mb-20">
                            <label for="email_host" class="form-label fw-semibold text-primary-light text-sm mb-8">SMTP Host</label>
                            <input type="text" name="email.host" id="email_host" class="form-control radius-8" placeholder="smtp.example.com" value="{{ old('email.host', $data['email']['host']) }}">
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="mb-20">
                            <label for="email_port" class="form-label fw-semibold text-primary-light text-sm mb-8">SMTP Port</label>
                            <input type="number" name="email.port" id="email_port" class="form-control radius-8" placeholder="587" value="{{ old('email.port', $data['email']['port'])}}">
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="mb-20">
                            <label for="email.username" class="form-label fw-semibold text-primary-light text-sm mb-8">Email Username</label>
                            <input type="text" name="email.username" id="email_username" class="form-control radius-8" placeholder="user@example.com" value="{{ old('email.username', $data['email']['username']) }}">
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="mb-20">
                            <label for="email_password" class="form-label fw-semibold text-primary-light text-sm mb-8">Email Password</label>
                            <input type="password" name="email_password" id="email_password" class="form-control radius-8" placeholder="********" value="{{ old('email.password', $data['email']['password']) }}">
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="mb-20">
                            <label for="email.encryption" class="form-label fw-semibold text-primary-light text-sm mb-8">Encryption (TLS/SSL)</label>
                            <input type="text" name="email.encryption" id="email_encryption" class="form-control radius-8" placeholder="tls" value="{{ old('email.encryption', $data['email']['encryption']) }}">
                        </div>
                    </div>

                    <div class="col-sm-12">
                        <div class="mb-20">
                            <label for="email_from" class="form-label fw-semibold text-primary-light text-sm mb-8">From Email Address</label>
                            <input type="email" name="email.from" id="email_from" class="form-control radius-8" placeholder="no-reply@example.com" value="{{ old('email.from', $data['email']['from']) }}">
                        </div>
                    </div>

                    <div class="col-sm-12">
                        <div class="mb-20">
                            <label for="email_name" class="form-label fw-semibold text-primary-light text-sm mb-8">From Name</label>
                            <input type="text" name="email.name" id="email_name" class="form-control radius-8" placeholder="Your Company Name" value="{{ old('email.name', $data['email']['name']) }}">
                        </div>
                    </div>

                    <div class="d-flex align-items-center justify-content-center gap-3 mt-24">
                        <button type="reset" class="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-40 py-11 radius-8">Reset</button>
                        <button type="submit" class="btn btn-primary border border-primary-600 text-md px-24 py-12 radius-8">Save Changes</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
