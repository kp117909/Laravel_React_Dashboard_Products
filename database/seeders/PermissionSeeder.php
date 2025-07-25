<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        ];

        foreach ($permissions as $value) {
            Permission::firstOrCreate(['name' => $value]);
        }

        // Tworzenie ról
        $admin = Role::firstOrCreate(['name' => 'Admin']);
        $manager = Role::firstOrCreate(['name' => 'Manager']);
        $user = Role::firstOrCreate(['name' => 'User']);

        // Przypisywanie permisji do ról
        $admin->givePermissionTo($permissions);

        $managerPermissions = [
            "users.view",
            "products.view",
            "products.edit",
            "products.create",
            "products.delete",
        ];
        $manager->givePermissionTo($managerPermissions);

        $userPermissions = [
            "products.view",
        ];
        $user->givePermissionTo($userPermissions);

        $adminUser = User::find(1);
        if ($adminUser) {
            $adminUser->assignRole($admin);
        }

    }
}
