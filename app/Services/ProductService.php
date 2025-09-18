<?php

namespace App\Services;

use App\Repositories\ProductRepository;
use App\Models\Product;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

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
            // Use cloudinary for production (Railway), public disk for local
            $disk = config('app.env') === 'production' ? 'cloudinary' : 'public';
            $data['image'] = $image->store('products', $disk);
        }

        return $this->repository->create($data);
    }

    public function updateProduct(int $id, array $data, ?UploadedFile $image = null): Product
    {
        $product = $this->repository->find($id);
        $disk = config('app.env') === 'production' ? 'cloudinary' : 'public';

        if ($image) {
            if ($product->image) {
                Storage::disk($disk)->delete($product->image);
            }

            $data['image'] = $image->store('products', $disk);
        }

        return $this->repository->update($id, $data);
    }

}
