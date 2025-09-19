<?php

namespace App\Queries\Orders;

use Illuminate\Database\Eloquent\Builder;

class SortableOrdersQuery
{
    protected static array $sortableFields = [
        'id',
        'total',
        'status',
        'created_at',
        'updated_at',
    ];

    public static function apply(Builder $query, string $sort, string $direction = 'desc'): Builder
    {
        if (!in_array($sort, self::$sortableFields)) {
            return $query->orderBy('created_at', 'desc');
        }

        return $query->orderBy($sort, $direction);
    }
}
