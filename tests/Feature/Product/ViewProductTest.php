<?php
use App\Models\User;
use App\Models\Product;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

test('authorized users can view details product', function () {
    Permission::findOrCreate('products.view');
    $role = Role::findOrCreate('Admin');
    $role->givePermissionTo('products.view');

    $user = User::factory()->create();
    $user->assignRole($role);

    $product = Product::factory()->create();

    $this->actingAs($user);

    $response = $this->get(route('products.show', $product->id));

    $response->assertOk();

    $response->assertInertia(fn ($page) =>
        $page
            ->component('products/show')
            ->where('product.id', $product->id)
            ->where('product.name', $product->name)
    );
});


test('unauthorized users cannot view product details', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create();

    $this->actingAs($user);

    $response = $this->get(route('products.show', $product->id));

    $response->assertRedirect('/');
});


test('guests cannot view product details', function () {
    $product = Product::factory()->create();

    $response = $this->get(route('products.show', $product->id));

    $response->assertRedirect('/login');
});
