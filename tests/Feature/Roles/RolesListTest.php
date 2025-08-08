<?php

use App\Models\Role;
use App\Models\User;
use Spatie\Permission\Models\Permission;
use Inertia\Testing\AssertableInertia as Assert;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

beforeEach(function () {
    Permission::findOrCreate('roles.view');
    Permission::findOrCreate('roles.edit');

    $adminRole = \Spatie\Permission\Models\Role::findOrCreate('Admin');
    $adminRole->givePermissionTo('roles.view', 'roles.edit');

    $this->admin = User::factory()->create();
    $this->admin->assignRole($adminRole);
});

test('authorized user can access paginated role list', function () {
    Role::factory()->count(30)->create();

    actingAs($this->admin)
        ->get('/roles')
        ->assertOk()
        ->assertInertia(fn (Assert $page) =>
            $page->component('roles/index')
                ->has('roles.data')
        );
});

test('pagination works correctly on role list', function () {
    Role::factory()->count(42)->create();

    actingAs($this->admin)
        ->get('/roles?page=2')
        ->assertOk()
        ->assertInertia(fn (Assert $page) =>
            $page->component('roles/index')
                ->where('roles.current_page', 2)
                ->where('roles.per_page', 10)
                ->where('roles.total', 43)
                ->has('roles.data', 10)
        );
});

test('role list can be searched by name', function () {
    Role::factory()->create(['name' => 'SpecialRole']);
    Role::factory()->count(10)->create();

    actingAs($this->admin)
        ->get('/roles?search=SpecialRole')
        ->assertOk()
        ->assertSee('SpecialRole');
});

test('role list can be sorted by name', function () {
    Role::factory()->create(['name' => 'ZebraRole']);
    Role::factory()->create(['name' => 'AlphaRole']);

    actingAs($this->admin)
        ->get('/roles?sort=name&direction=asc')
        ->assertOk()
        ->assertSeeInOrder(['AlphaRole', 'ZebraRole']);
});

test('filters and search persist after navigation', function () {
    $role = Role::factory()->create(['name' => 'ReturnRole']);

    actingAs($this->admin)
        ->get('/roles?search=ReturnRole&sort=name&direction=asc&page=1')
        ->assertOk()
        ->assertSee('ReturnRole');

    // Simulate going to edit
    $response = get(route('roles.edit', $role->id));
    $response->assertOk();

    // Simulate coming back
    $response = get('/roles?search=ReturnRole&sort=name&direction=asc&page=1');
    $response->assertOk()->assertSee('ReturnRole');
});
