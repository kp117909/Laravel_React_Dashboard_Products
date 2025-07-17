<?php

namespace App\Services;

use App\Repositories\ProductRepository;
use App\Models\Product;
use Illuminate\Http\UploadedFile;

class ProductService
{
    protected ProductRepository $repository;

    public function __construct(ProductRepository $repository)
    {
        $this->repository = $repository;
    }

    public function createProduct(array $data, ?UploadedFile $image = null): Product
    {
        if ($image) {
            $data['image'] = $image->store('products', 'public');
        }

        return $this->repository->create($data);
    }
}
