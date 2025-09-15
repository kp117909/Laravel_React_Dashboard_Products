<?php

use App\Services\ShopService;
use App\Services\ProductFilterService;
use App\Repositories\ProductRepository;
use App\Repositories\CategoryRepository;
use App\Http\Requests\Shop\ProductIndexRequest;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->productRepository = mock(ProductRepository::class);
    $this->categoryRepository = mock(CategoryRepository::class);
    $this->filterService = mock(ProductFilterService::class);

    $this->shopService = new ShopService(
        $this->productRepository,
        $this->categoryRepository,
        $this->filterService
    );
});

test('getShopPageData returns correct structure', function () {
    $request = mock(ProductIndexRequest::class);
    $filters = ['years' => [2023], 'categories' => [1]];

    // Create a mock paginator
    $products = mock(\Illuminate\Pagination\LengthAwarePaginator::class);
    $categories = collect([new Category(), new Category()]);
    $years = [2023, 2024];
    $priceRange = ['min' => 10, 'max' => 100];
    $ratingRange = ['min' => 1.0, 'max' => 5.0];
    $categoryCounts = [1 => 5, 2 => 3];
    $yearCounts = [2023 => 5, 2024 => 3];
    $ratingCounts = [0 => 2, 1 => 1, 2 => 1, 3 => 2, 4 => 3, 5 => 1];
    $availabilityCounts = ['available' => 8, 'not_available' => 2];

    $request->shouldReceive('filters')->once()->andReturn($filters);
    $request->shouldReceive('input')->with('per_page', 9)->once()->andReturn(9);
    $this->filterService->shouldReceive('withDefaults')->once()->with($filters)->andReturn($filters);
    $this->productRepository->shouldReceive('paginatePublished')->once()->with(['category'], 9, $filters)->andReturn($products);
    $this->productRepository->shouldReceive('distinctYears')->once()->andReturn($years);
    $this->categoryRepository->shouldReceive('all')->once()->andReturn($categories);
    $this->productRepository->shouldReceive('getPriceRange')->once()->andReturn($priceRange);
    $this->productRepository->shouldReceive('getRatingRange')->once()->andReturn($ratingRange);
    $this->categoryRepository->shouldReceive('getProductCounts')->once()->andReturn($categoryCounts);
    $this->productRepository->shouldReceive('getYearCounts')->once()->andReturn($yearCounts);
    $this->productRepository->shouldReceive('getRatingCounts')->once()->andReturn($ratingCounts);
    $this->productRepository->shouldReceive('getAvailabilityCounts')->once()->andReturn($availabilityCounts);
    $this->productRepository->shouldReceive('getBestSellingProducts')->once()->with(6, ['category'])->andReturn(new \Illuminate\Database\Eloquent\Collection([]));

    $result = $this->shopService->getShopPageData($request);

    expect($result)->toHaveKeys(['products', 'filters', 'filterOptions', 'counts', 'bestSellingProducts']);
    expect($result['filters'])->toHaveKeys(['years', 'categories', 'ratings', 'price_min', 'price_max', 'available', 'not_available', 'search']);
    expect($result['filterOptions'])->toHaveKeys(['years', 'categories', 'priceRange', 'ratingRange']);
    expect($result['counts'])->toHaveKeys(['categoryCounts', 'yearCounts', 'ratingCounts', 'availabilityCounts']);
});

test('getProducts calls repository with correct parameters', function () {
    $request = mock(ProductIndexRequest::class);
    $filters = ['years' => [2023], 'categories' => [1]];
    $products = mock(\Illuminate\Pagination\LengthAwarePaginator::class);
    $categories = collect([new Category(), new Category()]);
    $years = [2023, 2024];
    $priceRange = ['min' => 10, 'max' => 100];
    $ratingRange = ['min' => 1.0, 'max' => 5.0];
    $categoryCounts = [1 => 5, 2 => 3];
    $yearCounts = [2023 => 5, 2024 => 3];
    $ratingCounts = [0 => 2, 1 => 1, 2 => 1, 3 => 2, 4 => 3, 5 => 1];
    $availabilityCounts = ['available' => 8, 'not_available' => 2];

    $request->shouldReceive('filters')->once()->andReturn($filters);
    $request->shouldReceive('input')->with('per_page', 9)->once()->andReturn(9);
    $this->filterService->shouldReceive('withDefaults')->once()->with($filters)->andReturn($filters);
    $this->productRepository->shouldReceive('paginatePublished')
        ->once()
        ->with(['category'], 9, $filters)
        ->andReturn($products);
    $this->productRepository->shouldReceive('distinctYears')->once()->andReturn($years);
    $this->categoryRepository->shouldReceive('all')->once()->andReturn($categories);
    $this->productRepository->shouldReceive('getPriceRange')->once()->andReturn($priceRange);
    $this->productRepository->shouldReceive('getRatingRange')->once()->andReturn($ratingRange);
    $this->categoryRepository->shouldReceive('getProductCounts')->once()->andReturn($categoryCounts);
    $this->productRepository->shouldReceive('getYearCounts')->once()->andReturn($yearCounts);
    $this->productRepository->shouldReceive('getRatingCounts')->once()->andReturn($ratingCounts);
    $this->productRepository->shouldReceive('getAvailabilityCounts')->once()->andReturn($availabilityCounts);
    $this->productRepository->shouldReceive('getBestSellingProducts')->once()->with(6, ['category'])->andReturn(new \Illuminate\Database\Eloquent\Collection([]));

    $result = $this->shopService->getShopPageData($request);

    expect($result['products'])->toBe($products);
});

test('getFilterOptions returns all required data', function () {
    $years = [2023, 2024];
    $categories = collect([new Category(), new Category()]);
    $priceRange = ['min' => 10, 'max' => 100];
    $ratingRange = ['min' => 1.0, 'max' => 5.0];

    $this->productRepository->shouldReceive('distinctYears')->once()->andReturn($years);
    $this->categoryRepository->shouldReceive('all')->once()->andReturn($categories);
    $this->productRepository->shouldReceive('getPriceRange')->once()->andReturn($priceRange);
    $this->productRepository->shouldReceive('getRatingRange')->once()->andReturn($ratingRange);

    // Call the private method getFilterOptions using reflection
    $reflection = new ReflectionClass($this->shopService);
    $method = $reflection->getMethod('getFilterOptions');
    $method->setAccessible(true);

    $result = $method->invoke($this->shopService);

    expect($result)->toHaveKeys(['years', 'categories', 'priceRange', 'ratingRange']);
    expect($result['years'])->toBe($years);
    expect($result['categories'])->toBe($categories);
    expect($result['priceRange'])->toBe($priceRange);
    expect($result['ratingRange'])->toBe($ratingRange);
});

test('getShopPageData includes counts', function () {
    $request = mock(ProductIndexRequest::class);
    $filters = ['years' => [2023], 'categories' => [1]];

    // Create a mock paginator
    $products = mock(\Illuminate\Pagination\LengthAwarePaginator::class);
    $categories = collect([new Category(), new Category()]);
    $years = [2023, 2024];
    $priceRange = ['min' => 10, 'max' => 100];
    $ratingRange = ['min' => 1.0, 'max' => 5.0];
    $categoryCounts = [1 => 5, 2 => 3];
    $yearCounts = [2023 => 5, 2024 => 3];
    $ratingCounts = [0 => 2, 1 => 1, 2 => 1, 3 => 2, 4 => 3, 5 => 1];
    $availabilityCounts = ['available' => 8, 'not_available' => 2];

    $request->shouldReceive('filters')->once()->andReturn($filters);
    $request->shouldReceive('input')->with('per_page', 9)->once()->andReturn(9);
    $this->filterService->shouldReceive('withDefaults')->once()->with($filters)->andReturn($filters);
    $this->productRepository->shouldReceive('paginatePublished')->once()->with(['category'], 9, $filters)->andReturn($products);
    $this->productRepository->shouldReceive('distinctYears')->once()->andReturn($years);
    $this->categoryRepository->shouldReceive('all')->once()->andReturn($categories);
    $this->productRepository->shouldReceive('getPriceRange')->once()->andReturn($priceRange);
    $this->productRepository->shouldReceive('getRatingRange')->once()->andReturn($ratingRange);
    $this->categoryRepository->shouldReceive('getProductCounts')->once()->andReturn($categoryCounts);
    $this->productRepository->shouldReceive('getYearCounts')->once()->andReturn($yearCounts);
    $this->productRepository->shouldReceive('getRatingCounts')->once()->andReturn($ratingCounts);
    $this->productRepository->shouldReceive('getAvailabilityCounts')->once()->andReturn($availabilityCounts);
    $this->productRepository->shouldReceive('getBestSellingProducts')->once()->with(6, ['category'])->andReturn(new \Illuminate\Database\Eloquent\Collection([]));

    $result = $this->shopService->getShopPageData($request);

    expect($result['counts']['categoryCounts'])->toBe($categoryCounts);
    expect($result['counts']['yearCounts'])->toBe($yearCounts);
    expect($result['counts']['ratingCounts'])->toBe($ratingCounts);
    expect($result['counts']['availabilityCounts'])->toBe($availabilityCounts);
});

test('getShopPageData handles custom per_page parameter', function () {
    $request = mock(ProductIndexRequest::class);
    $filters = ['years' => [2023], 'categories' => [1]];

    // Create a mock paginator
    $products = mock(\Illuminate\Pagination\LengthAwarePaginator::class);
    $categories = collect([new Category(), new Category()]);
    $years = [2023, 2024];
    $priceRange = ['min' => 10, 'max' => 100];
    $ratingRange = ['min' => 1.0, 'max' => 5.0];
    $categoryCounts = [1 => 5, 2 => 3];
    $yearCounts = [2023 => 5, 2024 => 3];
    $ratingCounts = [0 => 2, 1 => 1, 2 => 1, 3 => 2, 4 => 3, 5 => 1];
    $availabilityCounts = ['available' => 8, 'not_available' => 2];

    $request->shouldReceive('filters')->once()->andReturn($filters);
    $request->shouldReceive('input')->with('per_page', 9)->once()->andReturn(24);
    $this->filterService->shouldReceive('withDefaults')->once()->with($filters)->andReturn($filters);
    $this->productRepository->shouldReceive('paginatePublished')->once()->with(['category'], 24, $filters)->andReturn($products);
    $this->productRepository->shouldReceive('distinctYears')->once()->andReturn($years);
    $this->categoryRepository->shouldReceive('all')->once()->andReturn($categories);
    $this->productRepository->shouldReceive('getPriceRange')->once()->andReturn($priceRange);
    $this->productRepository->shouldReceive('getRatingRange')->once()->andReturn($ratingRange);
    $this->categoryRepository->shouldReceive('getProductCounts')->once()->andReturn($categoryCounts);
    $this->productRepository->shouldReceive('getYearCounts')->once()->andReturn($yearCounts);
    $this->productRepository->shouldReceive('getRatingCounts')->once()->andReturn($ratingCounts);
    $this->productRepository->shouldReceive('getAvailabilityCounts')->once()->andReturn($availabilityCounts);
    $this->productRepository->shouldReceive('getBestSellingProducts')->once()->with(6, ['category'])->andReturn(new \Illuminate\Database\Eloquent\Collection([]));

    $result = $this->shopService->getShopPageData($request);

    expect($result['products'])->toBe($products);
});
