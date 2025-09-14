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
            ->has('counts.ratingCounts')
            ->has('counts.availabilityCounts')
    );
});

test('shop page accepts single rating filter', function () {
    $product1 = Product::factory()->create([
        'average_rating' => 4.5,
        'is_published' => true
    ]);

    $product2 = Product::factory()->create([
        'average_rating' => 2.3,
        'is_published' => true
    ]);

    $response = $this->get('/?ratings[]=4');

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop')
            ->where('filters.ratings.0', 4)
    );
});

test('shop page accepts multiple rating filters', function () {
    $product1 = Product::factory()->create([
        'average_rating' => 4.5,
        'is_published' => true
    ]);

    $product2 = Product::factory()->create([
        'average_rating' => 2.3,
        'is_published' => true
    ]);

    $product3 = Product::factory()->create([
        'average_rating' => 1.8,
        'is_published' => true
    ]);

    $response = $this->get('/?ratings[]=4&ratings[]=2');

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop')
            ->where('filters.ratings.0', 4)
            ->where('filters.ratings.1', 2)
    );
});

test('shop page accepts no rating filter (0)', function () {
    $product1 = Product::factory()->create([
        'average_rating' => null, // No rating
        'is_published' => true
    ]);

    $product2 = Product::factory()->create([
        'average_rating' => 4.5,
        'is_published' => true
    ]);

    $response = $this->get('/?ratings[]=0');

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop')
            ->where('filters.ratings.0', 0)
    );
});

test('shop page accepts mixed rating filters including no rating', function () {
    $product1 = Product::factory()->create([
        'average_rating' => null, // No rating
        'is_published' => true
    ]);

    $product2 = Product::factory()->create([
        'average_rating' => 4.5,
        'is_published' => true
    ]);

    $product3 = Product::factory()->create([
        'average_rating' => 2.3,
        'is_published' => true
    ]);

    $response = $this->get('/?ratings[]=0&ratings[]=4&ratings[]=2');

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop')
            ->where('filters.ratings.0', 0)
            ->where('filters.ratings.1', 4)
            ->where('filters.ratings.2', 2)
    );
});

test('shop page filters products by rating ranges correctly', function () {
    // Create products with different ratings
    $product3Star = Product::factory()->create([
        'average_rating' => 3.2, // Should match rating 3
        'is_published' => true
    ]);

    $product4Star = Product::factory()->create([
        'average_rating' => 4.7, // Should match rating 4
        'is_published' => true
    ]);

    $product5Star = Product::factory()->create([
        'average_rating' => 5.0, // Should match rating 5
        'is_published' => true
    ]);

    $productNoRating = Product::factory()->create([
        'average_rating' => null, // Should match rating 0
        'is_published' => true
    ]);

    // Test filtering by rating 3
    $response = $this->get('/?ratings[]=3');
    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop')
            ->where('products.data.0.id', $product3Star->id)
            ->where('products.data', fn ($products) => count($products) === 1)
    );

    // Test filtering by rating 4
    $response = $this->get('/?ratings[]=4');
    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop')
            ->where('products.data.0.id', $product4Star->id)
            ->where('products.data', fn ($products) => count($products) === 1)
    );

    // Test filtering by rating 5
    $response = $this->get('/?ratings[]=5');
    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop')
            ->where('products.data.0.id', $product5Star->id)
            ->where('products.data', fn ($products) => count($products) === 1)
    );

    // Test filtering by no rating (0)
    $response = $this->get('/?ratings[]=0');
    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop')
            ->where('products.data.0.id', $productNoRating->id)
            ->where('products.data', fn ($products) => count($products) === 1)
    );
});

test('shop page provides rating counts', function () {
    // Create products with different ratings
    Product::factory()->create(['average_rating' => 5.0, 'is_published' => true]);
    Product::factory()->create(['average_rating' => 4.5, 'is_published' => true]);
    Product::factory()->create(['average_rating' => 3.2, 'is_published' => true]);
    Product::factory()->create(['average_rating' => 2.1, 'is_published' => true]);
    Product::factory()->create(['average_rating' => 1.8, 'is_published' => true]);
    Product::factory()->create(['average_rating' => null, 'is_published' => true]); // No rating

    $response = $this->get('/');

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop')
            ->has('counts.ratingCounts')
            ->where('counts.ratingCounts.5', 1) // 1 product with 5★ rating
            ->where('counts.ratingCounts.4', 1) // 1 product with 4★ rating
            ->where('counts.ratingCounts.3', 1) // 1 product with 3★ rating
            ->where('counts.ratingCounts.2', 1) // 1 product with 2★ rating
            ->where('counts.ratingCounts.1', 1) // 1 product with 1★ rating
            ->where('counts.ratingCounts.0', 1) // 1 product with no rating
    );
});

test('shop page handles invalid rating filter parameters', function () {
    $response = $this->get('/?ratings[]=invalid&ratings[]=6');

    $response->assertRedirect();
    $response->assertSessionHasErrors(['ratings.1']); // Only ratings.1 should have error (ratings.0 gets converted to 0)
});

test('shop page combines rating filter with other filters', function () {
    $category = Category::factory()->create();
    $product = Product::factory()->create([
        'name' => 'Test Product',
        'category_id' => $category->id,
        'price' => 50.00,
        'average_rating' => 4.2,
        'is_published' => true,
        'is_available' => true,
        'created_at' => Carbon::create(2023, 1, 1)
    ]);

    $response = $this->get('/?search=Test&categories[]=' . $category->id . '&years[]=2023&price_min=25&price_max=75&ratings[]=4&available=1&not_available=0');

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page
            ->component('shop')
            ->where('filters.search', 'Test')
            ->where('filters.categories.0', $category->id)
            ->where('filters.years.0', 2023)
            ->where('filters.price_min', '25')
            ->where('filters.price_max', '75')
            ->where('filters.ratings.0', 4)
            ->where('filters.available', true)
            ->where('filters.not_available', false)
    );
});
