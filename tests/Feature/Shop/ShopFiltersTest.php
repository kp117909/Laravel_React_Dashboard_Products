<?php

use App\Models\Product;
use App\Models\Category;
use Carbon\Carbon;

test('shop page accepts search filter', function () {
    $product = Product::factory()->create([
        'name' => 'Test Product',
        'is_published' => true
    ]);

    $response = $this->get('/?search=Test');

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop')
            ->where('filters.search', 'Test')
    );
});

test('shop page accepts category filter', function () {
    $category1 = Category::factory()->create();
    $category2 = Category::factory()->create();

    $product1 = Product::factory()->create([
        'category_id' => $category1->id,
        'is_published' => true
    ]);

    $product2 = Product::factory()->create([
        'category_id' => $category2->id,
        'is_published' => true
    ]);

    $response = $this->get('/?categories[]=' . $category1->id);

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop')
            ->where('filters.categories.0', $category1->id)
    );
});

test('shop page accepts multiple category filters', function () {
    $category1 = Category::factory()->create();
    $category2 = Category::factory()->create();

    $product1 = Product::factory()->create([
        'category_id' => $category1->id,
        'is_published' => true
    ]);

    $product2 = Product::factory()->create([
        'category_id' => $category2->id,
        'is_published' => true
    ]);

    $response = $this->get('/?categories[]=' . $category1->id . '&categories[]=' . $category2->id);

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop')
            ->where('filters.categories.0', $category1->id)
            ->where('filters.categories.1', $category2->id)
    );
});

test('shop page accepts year filter', function () {
    $product = Product::factory()->create([
        'is_published' => true,
        'created_at' => Carbon::create(2023, 1, 1)
    ]);

    $response = $this->get('/?years[]=2023');

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop')
            ->where('filters.years.0', 2023)
    );
});

test('shop page accepts multiple year filters', function () {
    $product1 = Product::factory()->create([
        'is_published' => true,
        'created_at' => Carbon::create(2023, 1, 1)
    ]);

    $product2 = Product::factory()->create([
        'is_published' => true,
        'created_at' => Carbon::create(2024, 1, 1)
    ]);

    $response = $this->get('/?years[]=2023&years[]=2024');

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop')
            ->where('filters.years.0', 2023)
            ->where('filters.years.1', 2024)
    );
});

test('shop page accepts price range filter', function () {
    $product = Product::factory()->create([
        'price' => 50.00,
        'is_published' => true
    ]);

    $response = $this->get('/?price_min=25&price_max=75');

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop')
            ->where('filters.price_min', '25')
            ->where('filters.price_max', '75')
    );
});

test('shop page accepts minimum price filter only', function () {
    $product = Product::factory()->create([
        'price' => 100.00,
        'is_published' => true
    ]);

    $response = $this->get('/?price_min=50');

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop')
            ->where('filters.price_min', '50')
            ->where('filters.price_max', null)
    );
});

test('shop page accepts maximum price filter only', function () {
    $product = Product::factory()->create([
        'price' => 25.00,
        'is_published' => true
    ]);

    $response = $this->get('/?price_max=100&price_min=0');

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop')
            ->where('filters.price_min', '0')
            ->where('filters.price_max', '100')
    );
});

test('shop page accepts availability filter - available only', function () {
    $availableProduct = Product::factory()->create([
        'is_published' => true,
        'is_available' => true
    ]);

    $unavailableProduct = Product::factory()->create([
        'is_published' => true,
        'is_available' => false
    ]);

    $response = $this->get('/?available=1&not_available=0');

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop')
            ->where('filters.available', true)
            ->where('filters.not_available', false)
    );
});

test('shop page accepts availability filter - not available only', function () {
    $availableProduct = Product::factory()->create([
        'is_published' => true,
        'is_available' => true
    ]);

    $unavailableProduct = Product::factory()->create([
        'is_published' => true,
        'is_available' => false
    ]);

    $response = $this->get('/?available=0&not_available=1');

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop')
            ->where('filters.available', false)
            ->where('filters.not_available', true)
    );
});

test('shop page accepts availability filter - both available and not available', function () {
    $availableProduct = Product::factory()->create([
        'is_published' => true,
        'is_available' => true
    ]);

    $unavailableProduct = Product::factory()->create([
        'is_published' => true,
        'is_available' => false
    ]);

    $response = $this->get('/?available=1&not_available=1');

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop')
            ->where('filters.available', true)
            ->where('filters.not_available', true)
    );
});

test('shop page combines multiple filters', function () {
    $category = Category::factory()->create();
    $product = Product::factory()->create([
        'name' => 'Test Product',
        'category_id' => $category->id,
        'price' => 50.00,
        'is_published' => true,
        'is_available' => true,
        'created_at' => Carbon::create(2023, 1, 1)
    ]);

    $response = $this->get('/?search=Test&categories[]=' . $category->id . '&years[]=2023&price_min=25&price_max=75&available=1&not_available=0');

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop')
            ->where('filters.search', 'Test')
            ->where('filters.categories.0', $category->id)
            ->where('filters.years.0', 2023)
            ->where('filters.price_min', '25')
            ->where('filters.price_max', '75')
            ->where('filters.available', true)
            ->where('filters.not_available', false)
    );
});

test('shop page handles invalid filter parameters gracefully', function () {
    $response = $this->get('/?price_min=invalid&price_max=also_invalid');

    $response->assertRedirect();
    $response->assertSessionHasErrors(['price_min', 'price_max']);
});

test('shop page provides filter counts', function () {
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
            ->has('counts.categoryCounts')
            ->has('counts.yearCounts')
            ->has('counts.availabilityCounts')
    );
});
