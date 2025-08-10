<?php

use App\Models\Product;
use App\Models\Category;
use App\Models\User;

test('guests can view published product details', function () {
    $category = Category::factory()->create();
    $product = Product::factory()->create([
        'category_id' => $category->id,
        'is_published' => true
    ]);

    $response = $this->get(route('shop.products.show', $product->id));

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop/product-view')
            ->where('product.id', $product->id)
            ->where('product.name', $product->name)
            ->where('product.category.id', $category->id)
    );
});

test('authenticated users can view published product details', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create();
    $product = Product::factory()->create([
        'category_id' => $category->id,
        'is_published' => true
    ]);

    $this->actingAs($user);

    $response = $this->get(route('shop.products.show', $product->id));

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop/product-view')
            ->where('product.id', $product->id)
            ->where('product.name', $product->name)
            ->where('product.category.id', $category->id)
    );
});

test('unpublished products return 404', function () {
    $product = Product::factory()->create([
        'is_published' => false
    ]);

    $response = $this->get(route('shop.products.show', $product->id));

    $response->assertNotFound();
});

test('non-existent products return 404', function () {
    $response = $this->get(route('shop.products.show', 99999));

    $response->assertNotFound();
});

test('product view includes category relationship', function () {
    $category = Category::factory()->create();
    $product = Product::factory()->create([
        'category_id' => $category->id,
        'is_published' => true
    ]);

    $response = $this->get(route('shop.products.show', $product->id));

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop/product-view')
            ->has('product.category')
            ->where('product.category.id', $category->id)
            ->where('product.category.name', $category->name)
    );
});

test('product view shows correct product data', function () {
    $category = Category::factory()->create();
    $product = Product::factory()->create([
        'name' => 'Test Product',
        'description' => 'Test Description',
        'price' => 99.99,
        'category_id' => $category->id,
        'is_published' => true,
        'is_available' => true
    ]);

    $response = $this->get(route('shop.products.show', $product->id));

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop/product-view')
            ->where('product.name', 'Test Product')
            ->where('product.description', 'Test Description')
            ->where('product.price', 99.99)
            ->where('product.is_available', true)
    );
});

test('product view handles products with valid category', function () {
    $category = Category::factory()->create();
    $product = Product::factory()->create([
        'category_id' => $category->id,
        'is_published' => true
    ]);

    $response = $this->get(route('shop.products.show', $product->id));

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop/product-view')
            ->where('product.id', $product->id)
            ->where('product.category.id', $category->id)
    );
});
