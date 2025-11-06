<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Admin Login | {{ $site_name }}</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body class="bg-light">

<div class="min-vh-100 d-flex align-items-center justify-content-center">
    <div class="card shadow-sm p-4" style="max-width: 400px; width: 100%;">
        <h2 class="mb-4 text-center">Admin Login</h2>
        <form method="POST" action="{{route ('admin.login')  }}">
            @csrf

            <div class="mb-3">
                <label for="email" class="form-label fw-semibold">Email</label>
                <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    name="email" 
                    placeholder="admin@example.com" 
                    value="{{ old('email') }}" 
                    required 
                    autofocus
                >
                @error('email')
                    <div class="text-danger small mt-1">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-3">
                <label for="password" class="form-label fw-semibold">Password</label>
                <input 
                    type="password" 
                    class="form-control" 
                    id="password" 
                    name="password" 
                    placeholder="********" 
                    required
                >
                @error('password')
                    <div class="text-danger small mt-1">{{ $message }}</div>
                @enderror
            </div>

            <div class="form-check mb-4">
                <input 
                    class="form-check-input" 
                    type="checkbox" 
                    id="remember" 
                    name="remember" 
                    {{ old('remember') ? 'checked' : '' }}
                >
                <label class="form-check-label" for="remember">
                    Remember me
                </label>
            </div>

            <button type="submit" class="btn btn-primary w-100 fw-semibold">
                Sign In
            </button>
        </form>
    </div>
</div>

<!-- Bootstrap 5 JS bundle (optional for some components) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>
