<?php

namespace App\Repositories;

use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductRepository
{
    protected Product $model;

    public function __construct(Product $product)
    {
        $this->model = $product;
    }

    // Get product with pagination
    public function all($perPage = 15)
    {
        return $this->model->paginate($perPage);
    }

    // Find product by id
    public function find(int $id): ?Product
    {
        return $this->model->find($id);
    }

    // Create new product
    public function create(array $data): Product
    {
        return $this->model->create($data);
    }

    // Update product
    public function update(int $id, array $data): Product
    {
        $product = $this->find($id);
        if (!$product) {
            throw new ModelNotFoundException("Product with id $id not found");
        }

        $product->update($data);

        return $product;
    }

    // Delete product
    public function delete(int $id): bool
    {
        $product = $this->find($id);
        if (!$product) {
            return false;
        }
        return $product->delete();
    }
}
