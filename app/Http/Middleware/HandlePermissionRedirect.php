<?php

namespace App\Http\Middleware;

use Closure;

class HandlePermissionRedirect
{
    public function handle($request, Closure $next, $permission)
    {
        if (!$request->user() || !$request->user()->can($permission)) {
            return redirect()->route('home');
        }

        return $next($request);
    }
}
