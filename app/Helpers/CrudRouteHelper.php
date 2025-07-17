<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Route;

class CrudRouteHelper
{
    public static function routes(string $prefix, string $controller, string $permissionPrefix): void
    {
        Route::controller($controller)->prefix($prefix)->name("{$prefix}.")->group(function () use ($permissionPrefix) {
            Route::get('/', 'index')->name('index')->middleware("can.redirect:{$permissionPrefix}.view");
            Route::get('/create', 'create')->name('create')->middleware("can.redirect:{$permissionPrefix}.create");
            Route::post('/', 'store')->name('store')->middleware("can.redirect:{$permissionPrefix}.create");
            Route::get('/{id}', 'show')->name('show')->middleware("can.redirect:{$permissionPrefix}.view");
            Route::get('/{id}/edit', 'edit')->name('edit')->middleware("can.redirect:{$permissionPrefix}.edit");
            Route::put('/{id}', 'update')->name('update')->middleware("can.redirect:{$permissionPrefix}.edit");
            Route::delete('/{id}', 'destroy')->name('destroy')->middleware("can.redirect:{$permissionPrefix}.delete");
        });
    }
}
