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
}

