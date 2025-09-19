<?php

namespace App\Services;

use Spatie\Permission\Models\Permission;

class PermissionService
{
    public function create(array $data): Permission
    {
        $permission = Permission::create(['name' => $data['name']], ['guard_name' => 'web']);
        return $permission;
    }

    public function update(array $data, Permission $permission): Permission
    {
        $permission->update(['name' => $data['name']]);
        return $permission;
    }

    public function delete(int $id)
    {
        $permission = Permission::findOrFail($id);
        $permission->delete();
    }
}
