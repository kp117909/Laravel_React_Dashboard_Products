<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    public function run()
    {
        // Create roles
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

        $roles = [
            'super-admin',
            'developer',
            'designer',
            'content-manager',
            'seo-specialist',
            'social-media-manager',
            'customer-support',
            'sales-manager',
            'marketing-manager',
            'product-manager',
            'project-manager',
            'team-lead',
            'senior-developer',
            'junior-developer',
            'qa-engineer',
            'devops-engineer',
            'system-administrator',
            'network-administrator',
            'database-administrator',
            'security-specialist',
            'compliance-officer',
            'auditor',
            'financial-manager',
            'hr-manager',
            'recruiter',
        ];

        foreach ($roles as $role) {
            $roleModel = Role::firstOrCreate(['name' => $role, 'guard_name' => 'web']);

            // Only assign permissions if role was just created (doesn't have permissions yet)
            if ($roleModel->permissions->isEmpty()) {
                $randomPermissions = array_rand($permissions, rand(2, 5));

                if (is_array($randomPermissions)) {
                    foreach ($randomPermissions as $permission) {
                        $roleModel->givePermissionTo($permissions[$permission]);
                    }
                } else {
                    $roleModel->givePermissionTo($permissions[$randomPermissions]);
                }
            }
        }


    }
}
