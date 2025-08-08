<?php

use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\get;
use function Pest\Laravel\actingAs;

beforeEach(function () {
    Permission::findOrCreate('users.edit');
    Permission::findOrCreate('users.view');
    $adminRole = Role::findOrCreate('Admin');
    $adminRole->givePermissionTo('users.view');
    $adminRole->givePermissionTo('users.edit');

    $this->admin = User::factory()->create();
    $this->admin->assignRole($adminRole);
});

test('authorized user can access paginated user list', function () {
    User::factory()->count(30)->create();

    actingAs($this->admin)
        ->get('/users')
        ->assertOk()
        ->assertInertia(fn (Assert $page) =>
            $page->component('users/index')
                ->has('users.data')
        );
});


test('pagination works correctly on user list', function () {
    User::factory()->count(42)->create();

    actingAs($this->admin)
        ->get('/users?page=2')
        ->assertOk()
        ->assertInertia(fn (Assert $page) =>
            $page->component('users/index')
                ->where('users.current_page', 2)
                ->where('users.per_page', 10)
                ->where('users.total', 43) // 42 users + logged admin
                ->has('users.data', 10)
        );
});



test('user list can be searched by name or email', function () {
    User::factory()->create(['name' => 'SpecialUser', 'email' => 'special@example.com']);
    User::factory()->count(10)->create();

    actingAs($this->admin)
        ->get('/users?search=special')
        ->assertOk()
        ->assertSee('SpecialUser')
        ->assertSee('special@example.com');
});

test('user list can be sorted by name', function () {
    User::factory()->create(['name' => 'Zebra']);
    User::factory()->create(['name' => 'Alpha']);

    actingAs($this->admin)
        ->get('/users?sort=name&direction=asc')
        ->assertOk()
        ->assertSeeInOrder(['Alpha', 'Zebra']);
});

test('filters and search persist after navigation', function () {
    $user = User::factory()->create(['name' => 'ReturnTester']);

    actingAs($this->admin)
        ->get('/users?search=ReturnTester&sort=name&direction=asc&page=1')
        ->assertOk()
        ->assertSee('ReturnTester');

    $response = get(route('users.edit', $user->id));
    $response->assertOk();

    $response = get('/users?search=ReturnTester&sort=name&direction=asc&page=1');
    $response->assertOk()->assertSee('ReturnTester');
});

