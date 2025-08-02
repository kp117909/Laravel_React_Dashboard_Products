<?php

namespace App\Queries;

use Illuminate\Database\Eloquent\Builder;

class SortableProductsQuery
{
    protected static array $sortableFields = [
        'name',
        'price',
        'created_at',
        'average_rating',
        'reviews_count',
        'category_name',
    ];

    public static function apply(Builder $query, string $sort, string $direction = 'asc'): Builder
    {
        if (!in_array($sort, self::$sortableFields)) {
            return $query;
        }


        if ($sort === 'category_name') {
            if (!self::hasJoin($query, 'categories')) {
                $query->leftJoin('categories', 'products.category_id', '=', 'categories.id');
            }

            return $query->orderBy('categories.name', $direction)
                         ->select('products.*');
        }

        return $query->orderBy($sort, $direction);
    }

    // Helper to check if join already exists
    protected static function hasJoin(Builder $query, string $table): bool
    {
        return collect($query->getQuery()->joins ?? [])
            ->pluck('table')
            ->contains($table);
    }
}
