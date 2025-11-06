<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Console\Scheduling\Schedule;



use Illuminate\Http\Middleware\HandleCors;



return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
    $middleware->alias([
        'auth' => \App\Http\Middleware\Authenticate::class,
    ]);
         $middleware->append(HandleCors::class);

    $middleware->group('api', [
        \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class, // Sanctum for cookie-based auth
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,            // Add cookies
        \Illuminate\Session\Middleware\StartSession::class,                         // Start session
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,                  // Optional: for validation errors
        \Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class,
        // Required for CSRF protection
        'throttle:api',
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
        
        
       
    ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })
    ->withSchedule(function (Schedule $schedule) {
        $schedule->command('earnings:process')->everyMinute();
    })
    ->create();
