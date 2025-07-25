<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Models\Category;
use Inertia\Inertia;
use App\Repositories\ProductRepository;
use App\Services\ProductService;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductController extends Controller
{
    protected ProductRepository $products;
    protected ProductService $productService;

    public function __construct(ProductRepository $products, ProductService $productService)
    {
        $this->products = $products;
        $this->productService = $productService;
    }

    public function index()
    {
         $products = $this->products->allWithCategory();
         return Inertia::render('products/index', [
            'products' => $products
        ]);
    }

    public function show($id)
    {
        $product = $this->products->find($id);
        if (!$product) {
            abort(404);
        }

         return Inertia::render('products/show', [
            'product' => $product
        ]);
    }

    public function create()
    {
        $categories = Category::all();
        return Inertia::render('products/create', [
            'categories' => $categories
        ]);
    }

    public function store(StoreProductRequest $request)
    {

        $product = $this->productService->createProduct($request->validated(), $request->file('image'));

        return Inertia::render('products/show', [
            'product' => $product
        ]);
    }

    public function update(UpdateProductRequest $request, int $id)
    {
        $data = $request->validated();

        try {
            $product = $this->products->update($id, $data);
        } catch (ModelNotFoundException $e) {
            return redirect()->route('products.index')->with('error', 'Product not found');
        }

        return Inertia::render('products/show', [
            'product' => $product
        ]);
    }

    public function destroy($id)
    {
        $this->products->delete($id);
        return redirect()->route('products.index');
    }
}
