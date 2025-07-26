<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Repositories\ProductRepository;
use App\Services\ProductService;

class ProductController extends Controller
{

    protected ProductRepository $products;
    protected ProductService $productService;

    public function __construct(ProductRepository $products, ProductService $productService)
    {
        $this->products = $products;
        $this->productService = $productService;
    }

    public function show(int $id)
    {
        $product = $this->products->findPublishedById(['category'], $id);
        abort_unless($product, 404);
        return inertia('shop/product-view', [
            'product' => $product,
        ]);
    }

}
