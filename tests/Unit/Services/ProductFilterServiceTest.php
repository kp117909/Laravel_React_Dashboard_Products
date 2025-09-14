<?php

use App\Services\ProductFilterService;
use App\Repositories\ProductRepository;
use App\Repositories\CategoryRepository;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->productRepository = mock(ProductRepository::class);
    $this->categoryRepository = mock(CategoryRepository::class);

    $this->filterService = new ProductFilterService(
        $this->productRepository,
        $this->categoryRepository
    );
});

test('withDefaults adds years when empty', function () {
    $filters = ['categories' => [1, 2]];
    $years = [2023, 2024];

    $this->productRepository->shouldReceive('distinctYears')->once()->andReturn($years);

    $result = $this->filterService->withDefaults($filters);

    expect($result)->toHaveKey('years');
    expect($result['years'])->toBe($years);
    expect($result['categories'])->toBe([1, 2]);
});

test('withDefaults adds categories when empty', function () {
    $filters = ['years' => [2023, 2024]];
    $categories = collect([new Category(['id' => 1]), new Category(['id' => 2])]);

    $this->categoryRepository->shouldReceive('all')->once()->andReturn($categories);

    $result = $this->filterService->withDefaults($filters);

    expect($result)->toHaveKey('categories');
    expect($result['categories'])->toBeInstanceOf(\Illuminate\Support\Collection::class);
    expect($result['years'])->toBe([2023, 2024]);
});

test('withDefaults adds both years and categories when both empty', function () {
    $filters = [];
    $years = [2023, 2024];
    $categories = collect([new Category(['id' => 1]), new Category(['id' => 2])]);

    $this->productRepository->shouldReceive('distinctYears')->once()->andReturn($years);
    $this->categoryRepository->shouldReceive('all')->once()->andReturn($categories);

    $result = $this->filterService->withDefaults($filters);

    expect($result)->toHaveKeys(['years', 'categories']);
    expect($result['years'])->toBe($years);
    expect($result['categories'])->toBeInstanceOf(\Illuminate\Support\Collection::class);
});

test('withDefaults preserves existing filters', function () {
    $filters = [
        'years' => [2023],
        'categories' => [1],
        'search' => 'test',
        'price_min' => 10,
        'price_max' => 100,
        'ratings' => [0, 1, 2, 3, 4, 5],
        'available' => true,
        'not_available' => false
    ];

    $result = $this->filterService->withDefaults($filters);

    expect($result)->toBe($filters);
});

test('withDefaults handles empty array filters', function () {
    $filters = [];
    $years = [2023, 2024];
    $categories = collect([new Category(['id' => 1]), new Category(['id' => 2])]);

    $this->productRepository->shouldReceive('distinctYears')->once()->andReturn($years);
    $this->categoryRepository->shouldReceive('all')->once()->andReturn($categories);

    $result = $this->filterService->withDefaults($filters);

    expect($result)->toHaveKeys(['years', 'categories']);
    expect($result['years'])->toBe($years);
    expect($result['categories'])->toBeInstanceOf(\Illuminate\Support\Collection::class);
});
