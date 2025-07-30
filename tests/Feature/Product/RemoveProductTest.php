<?php

use App\Models\User;
use App\Models\Product;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

test('authorized user can remove product', function () {
    Permission::findOrCreate('products.delete');
    $role = Role::findOrCreate('Admin');
    $role->givePermissionTo('products.delete');

    $admin = User::factory()->create();
    $admin->assignRole($role);

    $product = Product::factory()->create();

    $this->actingAs($admin);

    $response = $this->delete(route('products.destroy', $product->id));

    $response->assertRedirect(route('products.index'));
    $this->assertDatabaseMissing('products', ['id' => $product->id]);
});

test('unauthorized user cannot remove product', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create();

    $this->actingAs($user);

    $response = $this->delete(route('products.destroy', $product->id));

    $response->assertRedirect('/');
    $this->assertDatabaseHas('products', ['id' => $product->id]);
});


test('quest cannot remove product', function () {
    $product = Product::factory()->create();

    $response = $this->delete(route('products.destroy', $product->id));

    $response->assertRedirect('/login');
    $this->assertDatabaseHas('products', ['id' => $product->id]);
});
