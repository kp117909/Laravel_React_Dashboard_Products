<?php

namespace App\Services;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
class UserService
{
    public function create(array $data): User
    {
        $user = User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => Hash::make($data['password']),
        ]);

        $roleName = Role::findOrFail($data['role'])->name;

        $user->assignRole($roleName);

        return $user;
    }

    public function update(array $data, int $id): User
    {
        $user = User::findOrFail($id);

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $roleId = $data['role'];
        unset($data['role']);

        $roleName = Role::findOrFail($roleId)->name;

        $user->update($data);
        $user->syncRoles($roleName);

        return $user;
    }

    public function delete(int $id)
    {
        $user = User::findOrFail($id);
        $user ->delete();

    }
}
