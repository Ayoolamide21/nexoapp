<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;


// Catch-all route for React SPA
Route::get('/{any}', function () {
    $indexPath = public_path('index.html');

    if (!File::exists($indexPath)) {
        abort(404, 'React frontend not found');
    }

    return File::get($indexPath);
})->where('any', '.*');

Route::get('/', function () {
    $indexPath = public_path('index.html');
    if (!File::exists($indexPath)) abort(404);
    return File::get($indexPath);
});

// routes/web.php