@extends('layouts.admin')

@section('title', 'App Settings')

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

    <div class="card h-100 p-0 radius-12 overflow-hidden">
        <div class="card-body p-40">
            <form action="{{ route('admin.settings.update') }}" method="POST" enctype="multipart/form-data">
                @csrf

                @php
                    $grouped = $data['settings']->groupBy('group');
                @endphp

                @foreach ($grouped as $group => $groupSettings)
                    <h4 class="mb-4 text-primary text-capitalize">{{ $group }}</h4>
                    <div class="row mb-5">
                        @foreach ($groupSettings as $setting)
                            @php
                                $isFile = Str::contains($setting->key, ['logo', 'favicon', 'image']);
                                $isBoolean = $setting->type === 'boolean';
                                $value = old($setting->key, $setting->value);
                            @endphp

                            <div class="col-sm-6">
                                <div class="mb-20">
                                    <label for="{{ $setting->key }}" class="form-label fw-semibold text-primary-light text-sm mb-8">
                                        {{ $setting->label }}
                                        @if($setting->description)
                                            <small class="text-muted d-block">{{ $setting->description }}</small>
                                        @endif
                                        @if(str_ends_with($setting->label, '*'))
                                            <span class="text-danger-600">*</span>
                                        @endif
                                    </label>
                                    @if($setting->key === 'app.currency')
                <select name="{{ $setting->key }}" id="{{ $setting->key }}" class="form-control radius-8 form-select">
                    @foreach ($data['currencies'] as $currency)
                        <option value="{{ $currency->code }}" {{ $value == $currency->code ? 'selected' : '' }}>
                            {{ $currency->name }} ({{ $currency->code }})
                        </option>
                    @endforeach
                </select>
                                    @elseif($isBoolean)
                                        <select name="{{ $setting->key }}" id="{{ $setting->key }}" class="form-control radius-8 form-select">
                                            <option value="1" {{ $value == true ? 'selected' : '' }}>True</option>
                                            <option value="0" {{ $value == false ? 'selected' : '' }}>False</option>
                                        </select>

                                    @elseif($isFile)
                                        <input type="file" name="{{ $setting->key }}" id="{{ $setting->key }}" class="form-control radius-8" accept="image/*">
                                        @if($setting->value)
                                            <img src="{{ asset($setting->value) }}" alt="{{ $setting->label }}" class="mt-2" style="max-height: 50px;">
                                        @endif

                                    @elseif(Str::contains($setting->key, ['email']))
                                        <input type="email" name="{{ $setting->key }}" id="{{ $setting->key }}" class="form-control radius-8" value="{{ $value }}" placeholder="Enter {{ $setting->label }}">

                                    @elseif(Str::contains($setting->key, ['url', 'website', 'redirect']))
                                        <input type="url" name="{{ $setting->key }}" id="{{ $setting->key }}" class="form-control radius-8" value="{{ $value }}" placeholder="Enter {{ $setting->label }}">

                                    @elseif(Str::contains($setting->key, ['phone', 'number']))
                                        <input type="tel" name="{{ $setting->key }}" id="{{ $setting->key }}" class="form-control radius-8" value="{{ $value }}" placeholder="Enter {{ $setting->label }}">

                                    @else
                                        <input type="text" name="{{ $setting->key }}" id="{{ $setting->key }}" class="form-control radius-8" value="{{ $value }}" placeholder="Enter {{ $setting->label }}">
                                    @endif

                                    @error($setting->key)
                                        <small class="text-danger">{{ $message }}</small>
                                    @enderror
                                </div>
                            </div>
                        @endforeach
                    </div>
                @endforeach

                <div class="d-flex align-items-center justify-content-center gap-3 mt-24">
                    <button type="reset" class="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-40 py-11 radius-8">Reset</button>
                    <button type="submit" class="btn btn-primary border border-primary-600 text-md px-24 py-12 radius-8">Save Changes</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
