<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Models\User;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            "users.view",
            "users.edit",
            "users.create",
            "users.delete",
            "products.view",
            "products.edit",
            "products.create",
            "products.delete",
            "roles.view",
            "roles.edit",
            "roles.create",
            "roles.delete",
            "sync.permissions"
        ];

        foreach ($permissions as $value) {
            Permission::firstOrCreate(['name' => $value]);
        }

        $admin = Role::firstOrCreate(['name' => 'admin']);
        $moderator = Role::firstOrCreate(['name' => 'moderator']);
        $user = Role::firstOrCreate(['name' => 'user']);


        // Only assign permissions if role doesn't have them
        if ($admin->permissions->isEmpty()) {
            $admin->givePermissionTo($permissions);
        }

        $moderatorPermissions = [
            "users.view",
            "products.view",
            "products.edit",
            "products.create",
            "products.delete",
        ];

        if ($moderator->permissions->isEmpty()) {
            $moderator->givePermissionTo($moderatorPermissions);
        }

        $userPermissions = [
            "products.view",
        ];

        if ($user->permissions->isEmpty()) {
            $user->givePermissionTo($userPermissions);
        }

        // Assign admin role to first user if they don't have it
        $adminUser = User::find(1);
        if ($adminUser && !$adminUser->hasRole('admin')) {
            $adminUser->assignRole($admin);
        }

    }
}
