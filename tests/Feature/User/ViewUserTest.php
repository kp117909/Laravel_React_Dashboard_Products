<?php

use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

test('authorized users can view details user', function () {
    Permission::findOrCreate('users.view');
    $role = Role::findOrCreate('Admin');
    $role->givePermissionTo('users.view');

    $user = User::factory()->create();
    $user->assignRole($role);

    $this->actingAs($user);

    $this->get('/users/1')->assertOk();
});

test('unauthorized users cannot view details user', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->get('/users/1')->assertRedirect('/');
});


test('guests cannot view details user', function () {
    $this->get('/users/1')->assertRedirect('/login');
});


