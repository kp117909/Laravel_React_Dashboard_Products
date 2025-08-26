<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Shop\ProductController as ShopProductController;
use App\Helpers\CrudRouteHelper;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;

Route::get('/', [ShopController::class, 'index'])->name('shop');


Route::prefix('cart')->name('cart.')->group(function () {
    Route::get('/', [CartController::class, 'index'])->name('index');
    Route::post('/add/{product}', [CartController::class, 'add'])->name('add');
    Route::patch('/update/{cartItem}', [CartController::class, 'update'])->name('update');
    Route::delete('/remove/{cartItem}', [CartController::class, 'remove'])->name('remove');
    Route::post('/clear', [CartController::class, 'clear'])->name('clear');
    Route::post('/apply-discount', [CartController::class, 'applyDiscountCode'])->name('apply-discount');
    Route::delete('/remove-discount', [CartController::class, 'removeDiscountCode'])->name('remove-discount');

});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('orders')->name('orders.')->group(function () {
        Route::get('/', [OrderController::class, 'index'])->name('index');
        Route::get('/{order}', [OrderController::class, 'show'])->name('show');
        Route::post('/store', [OrderController::class, 'store'])->name('store');
    });
});

Route::get('/shop/products/{product}', [ShopProductController::class, 'show'])->name('shop.products.show');

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
