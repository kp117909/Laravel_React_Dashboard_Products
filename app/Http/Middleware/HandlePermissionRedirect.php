<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Log;

class HandlePermissionRedirect
{
    public function handle($request, Closure $next, $permission)
    {
        $user = $request->user();
        $permissions = $user->getPermissionsViaRoles();
        // Log::info("User [{$user->id}] [{$user->name}] tries to access [{$permission}], hasPermission [{$permissions->contains('name', $permission)}], permission list: " . ($permissions->count() > 0 ? $permissions->pluck('name')->implode(', ') : 'EMPTY'), $permissions->pluck('name')->toArray());

        if (!$user || !$permissions->contains('name', $permission)) {
            return redirect()->route('home');
        }

        return $next($request);
    }
}
