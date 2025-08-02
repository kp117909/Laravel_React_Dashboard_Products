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
        return Category::all();
    }

    public function listToFilter()
    {
        return $this->model->select('id', 'name')->orderBy('name')->get();
    }
}

