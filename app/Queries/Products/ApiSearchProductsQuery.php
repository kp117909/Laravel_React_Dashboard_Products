<?php

namespace App\Queries\Products;

use Illuminate\Database\Eloquent\Builder;

class ApiSearchProductsQuery
{
    /**
     * Get search results formatted for API response
     */
    public static function getSearchResults(Builder $query, int $limit = 8): array
    {
        $products = $query
            ->limit($limit)
            ->get(['id', 'name', 'description', 'price', 'image', 'category_id']);

        return $products->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'image_url' => $product->image,
                'category' => $product->category ? $product->category->name : null,
                'url' => route('shop.products.show', $product->id)
            ];
        })->toArray();
    }
}
