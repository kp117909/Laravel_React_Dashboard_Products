<?php

use App\Models\Category;
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

    $response->assertRedirect('/products');
    $this->assertDatabaseHas('products', ['name' => 'Test Product']);
});

