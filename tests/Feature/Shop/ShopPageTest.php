<?php

use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use App\Services\ShopService;
use App\Http\Requests\Shop\ProductIndexRequest;

test('guests can access the shop page', function () {
    $response = $this->get('/');

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page->component('shop')
    );
});

test('authenticated users can access the shop page', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $response = $this->get('/');

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page->component('shop')
    );
});

test('shop page loads with required data structure', function () {
    $category = Category::factory()->create();
    $product = Product::factory()->create([
        'category_id' => $category->id,
        'is_published' => true,
        'is_available' => true
    ]);

    $response = $this->get('/');

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop')
            ->has('products')
            ->has('filters')
            ->has('filterOptions')
            ->has('counts')
            ->where('filterOptions.categories.0.id', $category->id)
            ->where('products.data.0.id', $product->id)
    );
});

test('shop page shows only published products', function () {
    $publishedProduct = Product::factory()->create(['is_published' => true]);
    $unpublishedProduct = Product::factory()->create(['is_published' => false]);

    $response = $this->get('/');

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page->component('shop')
    );
});

test('shop page includes filter options', function () {
    $category = Category::factory()->create();
    $product = Product::factory()->create([
        'category_id' => $category->id,
        'is_published' => true
    ]);

    $response = $this->get('/');

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->has('filterOptions.years')
            ->has('filterOptions.categories')
            ->has('filterOptions.priceRange')
            ->has('counts.categoryCounts')
            ->has('counts.yearCounts')
            ->has('counts.availabilityCounts')
    );
});

test('shop page handles empty products gracefully', function () {
    $response = $this->get('/');

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop')
            ->where('products.data', [])
            ->where('products.total', 0)
    );
});

test('shop page uses correct route name', function () {
    $response = $this->get(route('shop'));

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page->component('shop')
    );
});
