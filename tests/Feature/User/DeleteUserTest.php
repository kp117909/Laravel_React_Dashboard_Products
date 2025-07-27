<?php

use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

test('admin can delete users', function () {
    Permission::findOrCreate('users.delete');
    $adminRole = Role::findOrCreate('Admin');
    $adminRole->givePermissionTo('users.delete');

    $admin = User::factory()->create();
    $admin->assignRole('Admin');

    $userToDelete = User::factory()->create();

    $this->actingAs($admin);

    $response = $this->delete("/users/{$userToDelete->id}");

    $response->assertRedirect('/users');
    $this->assertDatabaseMissing('users', [
        'id' => $userToDelete->id,
    ]);
});


test('regular user cannot delete users', function () {
    Permission::findOrCreate('users.delete');
    Role::findOrCreate('User');

    $user = User::factory()->create();
    $user->assignRole('User');

    $targetUser = User::factory()->create();

    $this->actingAs($user);

    $response = $this->delete("/users/{$targetUser->id}");

    $response->assertRedirect('/');
    $this->assertDatabaseHas('users', [
        'id' => $targetUser->id,
    ]);
});
