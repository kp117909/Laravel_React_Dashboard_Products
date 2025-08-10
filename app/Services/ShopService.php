<?php

namespace App\Services;

use App\Repositories\ProductRepository;
use App\Repositories\CategoryRepository;
use App\Http\Requests\Shop\ProductIndexRequest;

class ShopService
{
    public function __construct(
        private ProductRepository $productRepository,
        private CategoryRepository $categoryRepository,
        private ProductFilterService $filterService
    ) {}

    /**
     * Get all data needed for the shop page
     */
    public function getShopPageData(ProductIndexRequest $request): array
    {
        $filters = $this->filterService->withDefaults($request->filters());

        return [
            'products' => $this->getProducts($filters),
            'filters' => $filters,
            'filterOptions' => $this->getFilterOptions(),
            'counts' => $this->getCounts(),
        ];
    }

    /**
     * Get paginated products with filters
     */
    private function getProducts(array $filters): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->productRepository->paginatePublished(['category'], 9, $filters);
    }

    /**
     * Get all filter options (years, categories, price range)
     */
    private function getFilterOptions(): array
    {
        return [
            'years' => $this->productRepository->distinctYears(),
            'categories' => $this->categoryRepository->all(),
            'priceRange' => $this->productRepository->getPriceRange(),
        ];
    }

    /**
     * Get counts for filter options
     */
    private function getCounts(): array
    {
        return [
            'categoryCounts' => $this->categoryRepository->getProductCounts(),
            'yearCounts' => $this->productRepository->getYearCounts(),
            'availabilityCounts' => $this->productRepository->getAvailabilityCounts(),
        ];
    }
}
