<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\URL;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Registered;
use App\Http\Middleware\HandlePermissionRedirect;

use App\Models\Product;
use App\Repositories\ProductRepository;
use App\Services\CartService;

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
        // Force HTTPS in production
        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }

        Route::aliasMiddleware('can.redirect', HandlePermissionRedirect::class);

        // Transfer guest cart to authenticated user on login/register
        Event::listen(Login::class, function (Login $event) {
            app(CartService::class)->transferGuestCart();
        });

        Event::listen(Registered::class, function (Registered $event) {
            app(CartService::class)->transferGuestCart();
        });
    }
}
