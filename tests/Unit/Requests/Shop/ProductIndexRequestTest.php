<?php

use App\Http\Requests\Shop\ProductIndexRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('validation rules are correct', function () {
    $request = new ProductIndexRequest();
    $rules = $request->rules();

    expect($rules)->toHaveKeys([
        'years',
        'years.*',
        'categories',
        'categories.*',
        'search',
        'price_min',
        'price_max',
        'available',
        'not_available'
    ]);

    expect($rules['years'])->toBe(['array']);
    expect($rules['years.*'])->toBe(['integer']);
    expect($rules['categories'])->toBe(['array']);
    expect($rules['categories.*'])->toBe(['integer']);
    expect($rules['search'])->toBe(['nullable', 'string', 'max:255']);
    expect($rules['price_min'])->toBe(['nullable', 'numeric', 'min:0']);
    expect($rules['price_max'])->toBe(['nullable', 'numeric', 'min:0', 'gte:price_min']);
    expect($rules['available'])->toBe(['nullable', 'boolean']);
    expect($rules['not_available'])->toBe(['nullable', 'boolean']);
});

test('filters method returns correct structure', function () {
    $request = new ProductIndexRequest();

    // Mock the input method
    $request->merge([
        'years' => [2023, 2024],
        'categories' => [1, 2],
        'search' => 'test',
        'price_min' => 10,
        'price_max' => 100,
        'available' => true,
        'not_available' => false
    ]);

    $filters = $request->filters();

    expect($filters)->toHaveKeys([
        'years',
        'categories',
        'search',
        'price_min',
        'price_max',
        'available',
        'not_available'
    ]);

    expect($filters['years'])->toBe([2023, 2024]);
    expect($filters['categories'])->toBe([1, 2]);
    expect($filters['search'])->toBe('test');
    expect($filters['price_min'])->toBe(10);
    expect($filters['price_max'])->toBe(100);
    expect($filters['available'])->toBe(true);
    expect($filters['not_available'])->toBe(false);
});

test('filters method returns defaults when input is empty', function () {
    $request = new ProductIndexRequest();

    $filters = $request->filters();

    expect($filters['years'])->toBe([]);
    expect($filters['categories'])->toBe([]);
    expect($filters['search'])->toBeNull();
    expect($filters['price_min'])->toBeNull();
    expect($filters['price_max'])->toBeNull();
    expect($filters['available'])->toBe(true);
    expect($filters['not_available'])->toBe(true);
});
