<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ProductController;
use App\Helpers\CrudRouteHelper;
use App\Http\Controllers\WelcomeController;

Route::get('/', [WelcomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    CrudRouteHelper::routes('users', UserController::class, 'users', 'user');
    CrudRouteHelper::routes('roles', RoleController::class, 'roles', 'role');
    CrudRouteHelper::routes('products', ProductController::class, 'products', 'product');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
