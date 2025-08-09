<?php

namespace App\Repositories;

use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Queries\SearchProductsQuery;
use App\Queries\SortableProductsQuery;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductRepository
{
    protected Product $model;

    public function __construct(Product $product)
    {
        $this->model = $product;
    }

    public function baseQuery(array $relations = [])
    {
        return $this->model::query()->where('is_published', true)->with($relations);
    }


    // Get product with pagination
    public function all($perPage = 15)
    {
        return $this->model->paginate($perPage);
    }

    // Get Product with category and pagination, sorted by newest
    public function allWithCategory(int $perPage = 15, ?string $search = null, array $options = [])
    {
        $query = $this->model->with('category');

        $query = SearchProductsQuery::apply($query, $search, $options);

        if (!empty($options['sort']) && is_string($options['sort'])) {
            $query = SortableProductsQuery::apply(
                $query,
                $options['sort'],
                $options['direction'] ?? 'asc'
            );
        }


        return $query->paginate($perPage)->withQueryString();
    }


    // Find product by id with optional relations
    public function find(int $id, array $with = []): ?Product
    {
        return $this->model
            ->with($with)
            ->find($id);
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
    // Get all published products
    public function allPublished(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model
            ->where('is_published', true)
            ->latest()
            ->get();
    }


    // Get paginated published products with relations
    public function paginatePublished(array $relations = [], int $perPage = 9, array $filters = []): LengthAwarePaginator
    {

       $q = $this->applyFilters($this->baseQuery($relations), $filters);

        return $q->orderByDesc('created_at')
                 ->paginate($perPage)
                 ->withQueryString();
    }

    // Find published product by id
    public function findPublishedById(array $relations = [], int $id): ?Product
    {
        return $this->baseQuery()->with($relations)->find($id);
    }

    public function applyFilters(Builder $query, array $filters): Builder
    {
        if (!empty($filters['years'])) {
            $query->yearIn($filters['years']);
        }

        if (!empty($filters['categories'])) {
            $query->whereIn('category_id', $filters['categories']);
        }

        return $query;
    }


    public function distinctYears(): array
    {
        return $this->model::distinctYears()->pluck('year')->all();
    }




}
