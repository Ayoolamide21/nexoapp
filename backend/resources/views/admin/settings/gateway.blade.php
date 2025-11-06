@extends('layouts.admin')

@section('title', $data['page_title'])

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

    <div class="card h-100 p-0 radius-12">
        <div class="card-body p-24">
            <div class="row gy-4">
                @foreach($data['gateways'] as $gateway)
                <div class="col-xxl-6">
                    <div class="card radius-12 shadow-none border overflow-hidden">
                        <div class="card-header bg-neutral-100 border-bottom py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                            <div class="d-flex align-items-center gap-10">
                                <span class="w-36-px h-36-px bg-base rounded-circle d-flex justify-content-center align-items-center">
                                    @if($gateway->logo)
                                        <img src="{{ asset('storage/' . $gateway->logo) }}" alt="{{ $gateway->name }}" class="">
                                    @else
                                        <img src="assets/images/payment/payment-gateway-default.png" alt="{{ $gateway->name }}" class="">
                                    @endif
                                </span>
                                <span class="text-lg fw-semibold text-primary-light">{{ $gateway->name }}</span>
                            </div>
                           
                            <div class="form-switch switch-primary d-flex align-items-center justify-content-center">
                    <input class="form-check-input" type="checkbox" name="status" value="1" id="status-toggle{{ $gateway->id }}" data-gateway-id="{{ $gateway->id }}" {{ $gateway->status ? 'checked' : '' }}>
                                </div>

                        </div>
                        <form action="{{ route('admin.payment_gateways.update', $gateway->id) }}" method="POST" enctype="multipart/form-data" class="card-body p-24">
                            @csrf
                            @method('PUT')
                            <div class="row gy-3">
                                <div class="col-sm-6">
                                    <label class="form-label fw-semibold text-primary-light text-md mb-8">Environment <span class="text-danger-600">*</span></label>
                                    <div class="d-flex align-items-center gap-3">
    <div class="d-flex align-items-center gap-10 fw-medium text-lg">
        <div class="form-check style-check d-flex align-items-center">
            <input class="form-check-input radius-4 border border-neutral-500" 
                   type="radio" 
                   name="environment" 
                   id="sandbox_{{ $gateway->id }}" 
                   value="sandbox" 
                   {{ $gateway->environment == 'sandbox' ? 'checked' : '' }}>
        </div>
        <label for="sandbox_{{ $gateway->id }}" class="form-label fw-medium text-lg text-primary-light mb-0">Sandbox</label>
    </div>
    <div class="d-flex align-items-center gap-10 fw-medium text-lg">
        <div class="form-check style-check d-flex align-items-center">
            <input class="form-check-input radius-4 border border-neutral-500" 
                   type="radio" 
                   name="environment" 
                   id="production_{{ $gateway->id }}" 
                   value="production" 
                   {{ $gateway->environment == 'production' ? 'checked' : '' }}>
        </div>
        <label for="production_{{ $gateway->id }}" class="form-label fw-medium text-lg text-primary-light mb-0">Production</label>
    </div>
</div>

                                </div>

                                <div class="col-sm-6">
                                    <label for="currency_{{ $gateway->id }}" class="form-label fw-semibold text-primary-light text-md mb-8">Currency <span class="text-danger-600">*</span></label>
                                    <select class="form-control radius-8 form-select" name="currency" id="currency{{ $gateway->id }}">
                                        <option disabled>Select Currency</option>
                                        <option value="USD" {{ $gateway->currency == 'USD' ? 'selected' : '' }}>USD</option>
                                        <option value="TK" {{ $gateway->currency == 'TK' ? 'selected' : '' }}>TK</option>
                                        <option value="Rupee" {{ $gateway->currency == 'Rupee' ? 'selected' : '' }}>Rupee</option>
                                    </select>
                                </div>

                                <div class="col-sm-6">
                                    <label for="secret_key_{{ $gateway->id }}" class="form-label fw-semibold text-primary-light text-md mb-8">Secret Key <span class="text-danger-600">*</span></label>
                                    <input type="text" class="form-control radius-8" id="secret_key_{{ $gateway->id }}" name="secret_key" placeholder="Secret Key" value="{{ $gateway->secret_key }}">
                                </div>

                                <div class="col-sm-6">
                                    <label for="public_key_{{ $gateway->id }}" class="form-label fw-semibold text-primary-light text-md mb-8">Public Key <span class="text-danger-600">*</span></label>
                                    <input type="text" class="form-control radius-8" id="public_key_{{ $gateway->id }}" name="public_key" placeholder="Public Key" value="{{ $gateway->public_key }}">
                                </div>

                                <div class="col-sm-6">
                                    <label for="logo{{ $gateway->id }}" class="form-label fw-semibold text-primary-light text-md mb-8">Logo <span class="text-danger-600">*</span></label>
                                    <input type="file" class="form-control radius-8" id="logo{{ $gateway->id }}" name="logo">
                                </div>

                                <div class="col-sm-6">
                                    <label class="form-label fw-semibold text-primary-light text-md mb-8"><span class="visibility-hidden">Save</span></label>
                                    <button type="submit" class="btn btn-primary border border-primary-600 text-md px-24 py-8 radius-8 w-100 text-center">
                                        Save Change
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </div>
</div>
@endsection
@section('script')

<script>
$('input[type="checkbox"][name="status"]').change(function() {
    let status = $(this).prop('checked') ? 1 : 0;
    let gatewayId = $(this).data('gateway-id'); 
    let environment = $('input[name="environment"]:checked').val();
    if (!environment) {
        alert("Please select an environment.");
        return; 
    }

    let currency = $('#currency' + gatewayId).val();
    if (!currency) {
        alert("Please select a currency.");
        return;
    }
    // Send AJAX request to update the status and other fields
    $.ajax({
        url: '/admin/settings/gateways/' + gatewayId, 
        type: 'POST',
        data: {
            _token: '{{ csrf_token() }}',
            _method: 'PUT',
            status: status,
            environment: environment,
            currency: currency,
        },
    });
});
</script>
@endsection
