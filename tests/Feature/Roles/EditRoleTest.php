<?php
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Auth\Access\AuthorizationException;

test('admin can edit role', function () {
    Permission::findOrCreate('roles.edit');
    $role = Role::findOrCreate('Admin');
    $role->givePermissionTo('roles.edit');

    $admin = User::factory()->create();
    $admin->assignRole($role);

    $this->actingAs($admin);

    $response = $this->put('/roles/1', [
        'name' => 'Manager',
        'guard_name' => 'web',
    ]);

    $response->assertRedirect('/roles');
    $this->assertDatabaseHas('roles', ['name' => 'Manager']);
});

test('user cannot edit role', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $response = $this->put('/roles/1', [
        'name' => 'Unauthorized Role',
        'guard_name' => 'web',
    ]);

    $response->assertStatus(404);
    $this->assertDatabaseMissing('roles', ['name' => 'Unauthorized Role']);
});


test('admin can edit permissions in role', function () {
    Permission::findOrCreate('roles.edit');
    Permission::findOrCreate('products.edit');
    Permission::findOrCreate('sync.permissions');
    $role = Role::findOrCreate('Admin');
    $role->givePermissionTo('roles.edit');
    $role->givePermissionTo('sync.permissions');
    $admin = User::factory()->create();
    $admin->assignRole($role);
    $this->actingAs($admin);

    $role_moderator = Role::findOrCreate('Moderator');
    $role_moderator->givePermissionTo('products.edit');

    Permission::findOrCreate('products.view');

    $permissions = Permission::where('name', 'products.view')->get();

    $roleService = app(\App\Services\RoleService::class);
    $roleService->syncPermissions($role_moderator, $permissions->pluck('id')->toArray());

    $this->put('/roles/2', [
        'name' => 'Moderator',
        'guard_name' => 'web',
        'permissions' => $permissions->pluck('id')->toArray(),
    ]);

    $this->assertDatabaseHas('role_has_permissions', [
        'role_id' => $role_moderator->id,
        'permission_id' => $permissions->pluck('id')->first(),
    ]);
});

test('user cannot edit role permissions', function () {
    $this->withoutExceptionHandling();
    $user = User::factory()->create();
    $role = Role::findOrCreate('User');
    Permission::findOrCreate('products.view');
    Permission::findOrCreate('products.create');
    Permission::findOrCreate('sync.permissions');
    $permissions = Permission::pluck('id')->toArray();

    $this->actingAs($user);

    $roleService = app(\App\Services\RoleService::class);

    $this->expectException(AuthorizationException::class);
    $roleService->syncPermissions($role, $permissions);


    $this->assertDatabaseMissing('role_has_permissions', [
        'role_id' => $role->id,
        'permission_id' => $permissions[0],
    ]);
});


test('admin can enter edit role page', function () {
    Permission::findOrCreate('roles.edit');
    $role = Role::findOrCreate('Admin');
    $role->givePermissionTo('roles.edit');

    $admin = User::factory()->create();
    $admin->assignRole($role);

    $this->actingAs($admin);

    $this->get('/roles/1/edit')->assertOk();
});

test('user cannot enter edit role page', function () {
    $user = User::factory()->create();
    $this->actingAs($user);
    $this->get('/roles/1/edit')->assertRedirect('/');
});


test('quest cannot enter edit role page', function () {
    $this->get('/roles/1/edit')->assertRedirect('/login');
});
