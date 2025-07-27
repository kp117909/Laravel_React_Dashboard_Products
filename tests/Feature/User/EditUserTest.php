<?php

use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

test('admin can edit users', function () {

    Permission::findOrCreate('users.edit');
    Role::findOrCreate('User');

    $adminRole = Role::findOrCreate('Admin');
    $adminRole->givePermissionTo('users.edit');

    $admin = User::factory()->create();
    $admin->assignRole('Admin');

    $userToEdit = User::factory()->create();

    $this->actingAs($admin);

    $response = $this->put("/users/{$userToEdit->id}", [
        'name' => 'Updated Name',
        'email' => $userToEdit->email,
        'role' => 'User',
    ]);

    $response->assertRedirect('/users');
    $this->assertDatabaseHas('users', [
        'id' => $userToEdit->id,
        'name' => 'Updated Name',
    ]);
});

test('regular user cannot edit users', function () {
    Permission::findOrCreate('users.edit');
    Role::findOrCreate('User');

    $user = User::factory()->create();
    $user->assignRole('User');

    $target = User::factory()->create();

    $this->actingAs($user);

    $response = $this->put("/users/{$target->id}", [
        'name' => 'Hacked Name',
        'email' => $target->email,
        'role' => 'User',
    ]);

    $response->assertRedirect('/');
    $this->assertDatabaseMissing('users', [
        'id' => $target->id,
        'name' => 'Hacked Name',
    ]);
});

