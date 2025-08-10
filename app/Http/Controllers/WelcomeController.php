<?php

namespace App\Http\Controllers;

use App\Repositories\ProductRepository;
use App\Repositories\CategoryRepository;
use Inertia\Inertia;
use App\Http\Requests\Shop\ProductIndexRequest;
use App\Services\ProductFilterService;

class WelcomeController extends Controller
{
    public function __construct(
        protected ProductRepository $productRepository,
        protected CategoryRepository $categoryRepository
    ) {}

    public function index(ProductIndexRequest $request, ProductFilterService $filterService)
    {
        $filters = $filterService->withDefaults($request->filters());

        return Inertia::render('welcome', [
            'products'   => $this->productRepository->paginatePublished(['category'], 9, $filters),
            'filters'    => $filters,
            'years'      => $this->productRepository->distinctYears(),
            'categories' => $this->categoryRepository->all(),
            'priceRange' => $this->productRepository->getPriceRange(),
            'categoryCounts' => $this->categoryRepository->getProductCounts(),
            'yearCounts' => $this->productRepository->getYearCounts(),
            'availabilityCounts' => $this->productRepository->getAvailabilityCounts(),
        ]);
    }
}
