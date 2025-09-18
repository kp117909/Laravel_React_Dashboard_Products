<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

test('admin can create product', function () {
    Permission::findOrCreate('products.create');
    Category::factory()->create(['id' => 1, 'name' => 'Test Category']);
    $role = Role::findOrCreate('Admin');
    $role->givePermissionTo('products.create');

    $admin = User::factory()->create();
    $admin->assignRole($role);

    $this->actingAs($admin);

    $response = $this->post('/products', [
        'name' => 'Test Product',
        'description' => 'Test description',
        'price' => 99.99,
        'reviews_count' => 0,
        'is_available' => true,
        'is_published' => true,
        'category_id' => 1,
    ]);

    $product = Product::where('name', 'Test Product')->first();

    $response->assertRedirect(route('shop.products.show', $product->id));
    $this->assertDatabaseHas('products', ['name' => 'Test Product']);
});

test('admin can enter create product page', function () {
    Permission::findOrCreate('products.create');
    $admin = User::factory()->create();
    $role = Role::findOrCreate('Admin');
    $role->givePermissionTo('products.create');
    $admin->assignRole($role);

    $this->actingAs($admin);

    $this->get('/products/create')->assertOk();
});

test('admin can not create invalid product', function () {
    Permission::findOrCreate('products.create');
    $role = Role::findOrCreate('Admin');
    $role->givePermissionTo('products.create');

    $admin = User::factory()->create();
    $admin->assignRole($role);

    $this->actingAs($admin);

    $response = $this->post('/products', [
        'name' => 532,
        'description' => 'Test description',
        'price' => 99.99,
        'reviews_count' => 0,
        'is_available' => true,
        'is_published' => true,
        'category_id' => 1,
    ]);
    $response->assertSessionHasErrors(['name']);
    $this->assertDatabaseMissing('products', ['name' => '']);
});

test('user can not create product', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $response = $this->post('/products', [
        'name' => 'Test Product',
        'description' => 'Test description',
        'price' => 99.99,
        'reviews_count' => 0,
        'is_available' => true,
        'is_published' => true,
        'category_id' => 1,
    ]);

    $response->assertRedirect('/');
    $this->assertDatabaseMissing('products', ['name' => 'Test Product']);
});


test('user can not enter create product page', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $response = $this->get('/products/create');

    $response->assertRedirect('/');
});


test('guest can not create product', function () {
    $response = $this->post('/products', [
        'name' => 'Test Product',
        'description' => 'Test description',
        'price' => 99.99,
        'reviews_count' => 0,
        'is_available' => true,
        'is_published' => true,
        'category_id' => 1,
    ]);

    $response->assertRedirect('/login');
    $this->assertDatabaseMissing('products', ['name' => 'Test Product']);
});
