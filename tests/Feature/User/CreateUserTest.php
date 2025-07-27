<?php

use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

test('users can be created by admin', function () {
    Permission::findOrCreate('users.create');

    $adminRole = Role::findOrCreate('Admin');
    Role::findOrCreate('User');
    $adminRole->givePermissionTo('users.create');

    $admin = User::factory()->create();
    $admin->assignRole($adminRole);

    $this->actingAs($admin);

    $response = $this->post('/users', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'role' => 'User',
    ]);

    $response->assertRedirect('/users');
    $this->assertDatabaseHas('users', ['email' => 'john@example.com']);

    $createdUser = User::where('email', 'john@example.com')->first();
    expect($createdUser->hasRole('User'))->toBeTrue();
});

test('users cannot be created by regular user', function () {
    Permission::findOrCreate('users.create');

    $userRole = Role::findOrCreate('User');

    $user = User::factory()->create();
    $user->assignRole($userRole);

    $this->actingAs($user);

    $response = $this->post('/users', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'role' => 'User',
    ]);

    $response->assertRedirect('/');

    $this->assertDatabaseMissing('users', ['email' => 'john@example.com']);
});
