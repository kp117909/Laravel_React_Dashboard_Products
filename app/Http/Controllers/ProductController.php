<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Models\Category;
use Inertia\Inertia;
use App\Repositories\ProductRepository;
use App\Repositories\CategoryRepository;
use App\Services\ProductService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected ProductRepository $products;
    protected ProductService $productService;
    protected CategoryRepository $categories;

    public function __construct(ProductRepository $products, ProductService $productService, CategoryRepository $categories)
    {
        $this->products = $products;
        $this->productService = $productService;
        $this->categories = $categories;
    }

    public function index(Request $request)
    {

        $products = $this->products->allWithCategory(
            perPage: $request->input('per_page', 10),
            search: $request->input('search'),
            options: $request->only(['sort', 'direction', 'category_id'])
        );

         return Inertia::render('products/index', [
            'products' => $products,
            'categories' => $this->categories->listToFilter(),
        ]);
    }

    public function show($id)
    {
        $product = $this->products->find($id, ['category']);
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

        return redirect()->route('shop.products.show', $product->id);
    }

    public function edit(int $id)
    {
        $product = $this->products->find($id, ['category']);
        if (!$product) {
            abort(404);
        }

        $categories = Category::all();

        return Inertia::render('products/edit', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    public function update(UpdateProductRequest $request, int $id)
    {
        try {
            $this->productService->updateProduct($id, $request->validated(), $request->file('image'));
        } catch (ModelNotFoundException $e) {
            return redirect()->route('shop');
        }

        return redirect()->route('shop.products.show', $id);
    }


    public function destroy($id)
    {
        $this->products->delete($id);
        return redirect()->route('products.index');
    }
}
