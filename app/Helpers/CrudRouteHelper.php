<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Route;

class CrudRouteHelper
{
    public static function routes(string $prefix, string $controller, string $permissionPrefix, string $param = 'id'): void
    {
        Route::controller($controller)->prefix($prefix)->name("{$prefix}.")->group(function () use ($permissionPrefix, $param) {
            Route::get('/', 'index')->name('index')->middleware("can.redirect:{$permissionPrefix}.view");
            Route::get('/create', 'create')->name('create')->middleware("can.redirect:{$permissionPrefix}.create");
            Route::post('/', 'store')->name('store')->middleware("can.redirect:{$permissionPrefix}.create");
            Route::get("/{{$param}}", 'show')->name('show')->middleware("can.redirect:{$permissionPrefix}.view");
            Route::get("/{{$param}}/edit", 'edit')->name('edit')->middleware("can.redirect:{$permissionPrefix}.edit");
            Route::put("/{{$param}}", 'update')->name('update')->middleware("can.redirect:{$permissionPrefix}.edit");
            Route::delete("/{{$param}}", 'destroy')->name('destroy')->middleware("can.redirect:{$permissionPrefix}.delete");
        });
    }
}
