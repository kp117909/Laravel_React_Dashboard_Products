<?php

namespace App\Http\Controllers;

use App\Repositories\ProductRepository;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    protected ProductRepository $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function index()
    {
        $products = $this->productRepository->allWithCategory(9);
        return Inertia::render('welcome', [
            'products' => $products,
        ]);
    }
}
