<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Helpers\CrudRouteHelper;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    CrudRouteHelper::routes('users', UserController::class, 'users');
    CrudRouteHelper::routes('roles', RoleController::class, 'roles');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
