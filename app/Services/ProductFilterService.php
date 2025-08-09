<?php

namespace App\Services;

use App\Repositories\ProductRepository;
use App\Repositories\CategoryRepository;

class ProductFilterService
{
    public function __construct(
        private ProductRepository $products,
        private CategoryRepository $categories
    ) {}
    public function withDefaults(array $filters): array
    {
        if (empty($filters['years'])) {
            $filters['years'] = $this->products->distinctYears();
        }

        if (empty($filters['categories'])) {
            $filters['categories'] = $this->categories
                ->all()
                ->pluck('id');
        }

        return $filters;
    }
}
