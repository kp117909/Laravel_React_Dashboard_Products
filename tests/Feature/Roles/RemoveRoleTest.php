<?php

use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

test('admin can remove role', function () {
    Permission::findOrCreate('roles.delete');
    $role = Role::findOrCreate('Admin');
    $role->givePermissionTo('roles.delete');

    $admin = User::factory()->create();
    $admin->assignRole($role);

    $this->actingAs($admin);
    Role::findOrCreate('Delete Role');

    $response = $this->delete('/roles/2');

    $response->assertRedirect('/roles');
    $this->assertDatabaseMissing('roles', ['id' => 2]);
});


test('user cannot remove role', function () {
    $user = User::factory()->create();
    Role::findOrCreate('Delete Role');
    $this->actingAs($user);

    $response = $this->delete('/roles/1');

    $response->assertRedirect('/');
    $this->assertDatabaseHas('roles', ['id' => 1]);
});


test('guest cannot remove role', function () {
    $response = $this->delete('/roles/1');
    Role::findOrCreate('Delete Role');

    $response->assertRedirect('/login');
    $this->assertDatabaseHas('roles', ['id' => 1]);
});
