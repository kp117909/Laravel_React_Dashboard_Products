<?php

namespace App\Repositories;

use App\Models\Category;

class CategoryRepository
{

    protected Category $model;

    public function __construct(Category $category)
    {
        $this->model = $category;
    }
    public function all()
    {
        return $this->model->all();
    }

    /**
     * Get product counts for each category
     */
    public function getProductCounts(): array
    {
        return $this->model
            ->withCount('products')
            ->get()
            ->pluck('products_count', 'id')
            ->toArray();
    }

    public function listToFilter()
    {
        return $this->model->select('id', 'name')->orderBy('name')->get();
    }

    /**
     * Search categories by name
     */
    public function searchCategories(string $search, int $limit = 4): array
    {
        return $this->model
            ->where('name', 'like', "%{$search}%")
            ->withCount(['products' => function ($query) {
                $query->where('is_published', true);
            }])
            ->limit($limit)
            ->get(['id', 'name'])
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'products_count' => $category->products_count,
                    'url' => '/?categories[]=' . $category->id
                ];
            })
            ->toArray();
    }
}

