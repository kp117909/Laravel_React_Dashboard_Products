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
        'name' => '', // Invalid name
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

