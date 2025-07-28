<?php

use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

test('guests are redirected to the login page', function () {
    $this->get('/dashboard')->assertRedirect('/login');
});

test('authenticated users can visit the dashboard', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get('/dashboard')->assertOk();
});

test('unauthorized users cannot access user list', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->get('/users')->assertRedirect('/');
});

test('unauthorized users cannot access product list', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->get('/products')->assertRedirect('/');
});

test('authorized users can access user list', function () {
    Permission::findOrCreate('users.view');
    $role = Role::findOrCreate('Admin');
    $role->givePermissionTo('users.view');

    $user = User::factory()->create();
    $user->assignRole($role);

    $this->actingAs($user);

    $this->get('/users')->assertOk();
});

test('authorized users can access product list', function () {
    Permission::findOrCreate('products.view');
    $role = Role::findOrCreate('Admin');
    $role->givePermissionTo('products.view');

    $user = User::factory()->create();
    $user->assignRole($role);

    $this->actingAs($user);

    $this->get('/products')->assertOk();
});


test('unathorized users cannot access role list', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->get('/roles')->assertRedirect('/');
});


test('authorized users can access role list', function () {
    Permission::findOrCreate('roles.view');
    $role = Role::findOrCreate('Admin');
    $role->givePermissionTo('roles.view');

    $user = User::factory()->create();
    $user->assignRole($role);

    $this->actingAs($user);

    $this->get('/roles')->assertOk();
});

test('users can access shop page from dashboard', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->get('/')->assertOk();
});

