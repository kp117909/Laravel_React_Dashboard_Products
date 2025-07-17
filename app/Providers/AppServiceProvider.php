<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\HandlePermissionRedirect;

use App\Models\Product;
use App\Repositories\ProductRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(ProductRepository::class, function ($app) {
            return new ProductRepository(new Product());
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

        Route::aliasMiddleware('can.redirect', HandlePermissionRedirect::class);
    }
}
