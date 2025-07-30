<?php

use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


test('admin can create role', function () {
    Permission::findOrCreate('roles.create');
    $role = Role::findOrCreate('Admin');
    $role->givePermissionTo('roles.create');

    $admin = User::factory()->create();
    $admin->assignRole($role);

    $this->actingAs($admin);

    $response = $this->post('/roles', [
        'name' => 'Manager',
        'guard_name' => 'web',
    ]);

    $response->assertRedirect('/roles');
    $this->assertDatabaseHas('roles', ['name' => 'Manager']);
});

test('admin can enter create role page', function () {
    Permission::findOrCreate('roles.create');
    $admin = User::factory()->create();
    $role = Role::findOrCreate('Admin');
    $role->givePermissionTo('roles.create');
    $admin->assignRole($role);

    $this->actingAs($admin);

    $this->get('/roles/create')->assertOk();
});

test('admin cannot create invalid role', function () {
    Permission::findOrCreate('roles.create');
    $role = Role::findOrCreate('Admin');
    $role->givePermissionTo('roles.create');

    $admin = User::factory()->create();
    $admin->assignRole($role);

    $this->actingAs($admin);

    $response = $this->post('/roles', [
        'name' => '',
        'guard_name' => 'web',
    ]);

    $response->assertSessionHasErrors(['name']);
});

test('unauthorized user cannot create role', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $response = $this->post('/roles', [
        'name' => 'Unauthorized Role',
        'guard_name' => 'web',
    ]);

    $response->assertRedirect('/');
    $this->assertDatabaseMissing('roles', ['name' => 'Unauthorized Role']);
});

# assing permission to role do tests
test('admin can assign permission to role', function () {
    Permission::findOrCreate('roles.edit');
    Permission::findOrCreate('products.view');
    $admin = User::factory()->create();
    $role_admin = Role::findOrCreate('Admin');
    $role_admin->givePermissionTo('roles.edit');
    $admin->assignRole($role_admin);

    $this->actingAs($admin);

    $role_moderator = Role::findOrCreate('Moderator');
    $permissions = Permission::where('name', 'products.view')->get();

    $role_moderator->syncPermissions($permissions->pluck('id')->toArray());

    $this->assertDatabaseHas('role_has_permissions', [
        'role_id' => $role_moderator->id,
        'permission_id' => $permissions->pluck('id')->first(),
    ]);
});

test('user cannot assign permission to role', function () {
    $user = User::factory()->create();
    $role = Role::findOrCreate('Moderator');
    $permissions = Permission::where('name', 'products.view')->get();

    $this->actingAs($user);

    $role->syncPermissions($permissions->pluck('id')->toArray());

    $this->assertDatabaseMissing('role_has_permissions', [
        'role_id' => $role->id,
        'permission_id' => $permissions->pluck('id')->first(),
    ]);
});


test('quest cannot enter create role page', function () {
    $this->get('/roles/create')->assertRedirect('/login');
});
