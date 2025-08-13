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
        $perPage = $this->getValidatedPerPage($request->input('per_page', 9));

        return [
            'products' => $this->getProducts($filters, $perPage),
            'filters' => $filters,
            'filterOptions' => $this->getFilterOptions(),
            'counts' => $this->getCounts(),
        ];
    }

    /**
     * Get paginated products with filters
     */
    private function getProducts(array $filters, int $perPage): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->productRepository->paginatePublished(['category'], $perPage, $filters);
    }

    /**
     * Validate and return per_page parameter
     */
    private function getValidatedPerPage($perPage): int
    {
        $allowedPerPage = [6, 9, 12, 24, 48];
        if (!in_array((int) $perPage, $allowedPerPage)) {
            return 9;
        }
        return (int) $perPage;
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
