<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\ProductRepository;
use App\Repositories\CategoryRepository;
use App\Queries\Products\SearchProductsQuery;
use App\Queries\Products\ApiSearchProductsQuery;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SearchController extends Controller
{
    protected ProductRepository $productRepository;
    protected CategoryRepository $categoryRepository;

    public function __construct(ProductRepository $productRepository, CategoryRepository $categoryRepository)
    {
        $this->productRepository = $productRepository;
        $this->categoryRepository = $categoryRepository;
    }

    public function searchProducts(Request $request): JsonResponse
    {
        $search = $request->input('q', '');

        if (strlen($search) < 2) {
            return response()->json([
                'products' => []
            ]);
        }

        // Search products
        $query = $this->productRepository->baseQuery(['category']);
        $query = SearchProductsQuery::apply($query, $search);
        $products = ApiSearchProductsQuery::getSearchResults($query);

        // Search categories
        $categories = $this->categoryRepository->searchCategories($search, 4);

        return response()->json([
            'products' => $products,
            'categories' => $categories
        ]);
    }
}
