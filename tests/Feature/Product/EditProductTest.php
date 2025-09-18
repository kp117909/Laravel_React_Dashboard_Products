<?php

use App\Models\User;
use App\Models\Product;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

test('authorized users access product edit page', function () {
    Permission::findOrCreate('products.edit');
    $role = Role::findOrCreate('Admin');
    $role->givePermissionTo('products.edit');

    $admin = User::factory()->create();
    $admin->assignRole($role);

    $product = Product::factory()->create();

    $this->actingAs($admin);

    $response = $this->get(route('products.edit', $product->id));

    $response->assertOk();

    $response->assertInertia(fn ($page) =>
        $page
            ->component('products/edit')
            ->where('product.id', $product->id)
            ->where('product.name', $product->name)
    );
});

test('unauthorized users cannot access product edit page', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create();

    $this->actingAs($user);

    $response = $this->get(route('products.edit', $product->id));

    $response->assertRedirect('/');
});


test('authorized users can update product', function () {
    Permission::findOrCreate('products.edit');
    $role = Role::findOrCreate('Admin');
    $role->givePermissionTo('products.edit');

    $admin = User::factory()->create();
    $admin->assignRole($role);

    $product = Product::factory()->create();

    $this->actingAs($admin);

    $response = $this->put(route('products.update', $product->id), [
        'name' => 'Updated Product',
        'description' => 'Updated description',
        'price' => 89.99,
        'reviews_count' => 0,
        'is_available' => true,
        'is_published' => true,
        'category_id' => 1,
    ]);
    $response->assertRedirect(route('shop.products.show', $product->id));
    $this->assertDatabaseHas('products', [
        'id' => $product->id,
        'name' => 'Updated Product',
    ]);
});

test('unauthorized users cannot update product', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create();

    $this->actingAs($user);

    $response = $this->put(route('products.update', $product->id), [
        'name' => 'Updated Product',
        'description' => 'Updated description',
        'price' => 89.99,
        'reviews_count' => 0,
        'is_available' => true,
        'is_published' => true,
        'category_id' => 1,
    ]);
    $response->assertRedirect('/');
    $this->assertDatabaseMissing('products', [
        'id' => $product->id,
        'name' => 'Updated Product',
    ]);
});


test('admin cannot update product with invalid data', function () {
    Permission::findOrCreate('products.edit');
    $role = Role::findOrCreate('Admin');
    $role->givePermissionTo('products.edit');

    $admin = User::factory()->create();
    $admin->assignRole($role);

    $product = Product::factory()->create();

    $this->actingAs($admin);

    $this->put(route('products.update', $product->id), [
        'name' => '',
        'description' => 'Updated description',
        'price' => 89.99,
        'reviews_count' => 0,
        'is_available' => true,
        'is_published' => true,
        'category_id' => 1,
    ]);

    $this->assertDatabaseMissing('products', [
        'id' => $product->id,
        'name' => '',
    ]);
});

test('quest cannot update product', function () {
    $product = Product::factory()->create();

    $response = $this->put(route('products.update', $product->id), [
        'name' => 'Updated Product',
        'description' => 'Updated description',
        'price' => 89.99,
        'reviews_count' => 0,
        'is_available' => true,
        'is_published' => true,
        'category_id' => 1,
    ]);

    $response->assertRedirect('/login');
    $this->assertDatabaseMissing('products', [
        'id' => $product->id,
        'name' => 'Updated Product',
    ]);
});
