<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;

class ImageDebugController extends Controller
{
    public function listImages()
    {
        try {
            // Get all files in products directory
            $files = Storage::disk('public')->files('products');

            // Get products with images from database
            $productsWithImages = Product::whereNotNull('image')->get(['id', 'name', 'image']);

            return response()->json([
                'status' => 'success',
                'storage_files' => $files,
                'products_with_images' => $productsWithImages,
                'storage_path' => storage_path('app/public/products'),
                'public_url_base' => asset('storage/products/'),
                'total_files' => count($files),
                'total_products_with_images' => $productsWithImages->count()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }
}
