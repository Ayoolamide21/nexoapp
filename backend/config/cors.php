<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    // Allow specific origins, including your frontend URL
    'allowed_origins' => [
        env('APP_URL'),
        env('FRONTEND_URL'),
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['Origin', 'Content-Type', 'Accept', 'Authorization', 'X-XSRF-TOKEN'],

    'exposed_headers' => [],

    'max_age' => 0,

    // Supports credentials to allow sending cookies
    'supports_credentials' => true,
];
