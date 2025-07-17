<?php

namespace App\Services;

use Spatie\Permission\Models\Role;

class RoleService
{
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
            $role->syncPermissions($data['permissions']);
        }

        return $role;
    }

    public function delete(int $id)
    {
        $role = Role::findOrFail($id);

        if ($role->users()->exists()) {
            throw new \Exception("Nie można usunąć roli, która jest przypisana do użytkowników.");
        }

        $role->delete();
    }
}
