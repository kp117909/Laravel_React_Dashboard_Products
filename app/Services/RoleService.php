<?php

namespace App\Services;

use Spatie\Permission\Models\Role;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthManager;
use Illuminate\Support\Facades\Log;

class RoleService
{
    private $auth;

    public function __construct(AuthManager $auth)
    {
        $this->auth = $auth;
    }

    public function create(array $data): Role
    {
        $role = Role::create(['name' => $data['name']]);

        if (!empty($data['permissions'])) {
            $role->syncPermissions($data['permissions']);
        }

        return $role;
    }

    public function update(array $data, Role $role): Role
    {
        $role->update(['name' => $data['name']]);

        if (isset($data['permissions'])) {
            $this->syncPermissions($role, $data['permissions']);
        }

        return $role;
    }

    public function delete(int $id)
    {
        $role = Role::findOrFail($id);

        if ($role->users()->exists()) {
            throw new \Exception('Cannot delete role that is assigned to users.');
        }

        $role->delete();
    }


    public function syncPermissions(Role $role, array $permissions)
    {
        if ($this->permissionHaveChanged($role, $permissions)) {
            if (!$this->userHasPermissionToSync()) {
                throw new AuthorizationException('You do not have permission to change permissions in roles.');
            }
        }

        $role->permissions()->sync($permissions);
    }

    private function userHasPermissionToSync(): bool
    {
        return $this->auth->user()->hasPermissionTo('sync.permissions');
    }

    private function permissionHaveChanged(Role $role, array $permissions): bool
    {
        $oldPermissions = $role->permissions->pluck('id')->toArray();
        $newPermissions = $permissions;

        return $oldPermissions !== $newPermissions;
    }
}
