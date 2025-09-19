<?php

namespace App\Http\Middleware;

use Closure;


class HandlePermissionRedirect
{
    public function handle($request, Closure $next, $permission)
    {
        $user = $request->user();
        $permissions = $user->getPermissionsViaRoles();

        if (!$user || !$permissions->contains('name', $permission)) {
            return redirect()->route('shop');
        }

        return $next($request);
    }
}
