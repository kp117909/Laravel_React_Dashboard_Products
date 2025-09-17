<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Inertia\Inertia;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);


        $middleware->alias([
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,
        ]);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
        ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e) {
            if (request()->expectsJson()) {
                return response()->json(['message' => 'Not found.'], 404);
            }

            // Only render custom 404 page for web routes, not API routes
            if (request()->is('api/*') || app()->environment('testing')) {
                return response()->json(['message' => 'Not found.'], 404);
            }

            return Inertia::render('errors/404', [
                'status' => 404,
                'title' => 'Page Not Found',
                'message' => 'The page you are looking for could not be found.'
            ], 404);
        });

        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\HttpException $e) {
            if (request()->expectsJson()) {
                return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
            }

            // Only render custom error page for web routes, not API routes
            if (request()->is('api/*') || app()->environment('testing')) {
                return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
            }

            return Inertia::render('errors/error', [
                'status' => $e->getStatusCode(),
                'title' => $e->getMessage(),
                'message' => 'An error occurred while processing your request.'
            ], $e->getStatusCode());
        });
    })->create();
