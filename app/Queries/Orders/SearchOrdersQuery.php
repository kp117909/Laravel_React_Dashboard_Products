<?php

namespace App\Queries\Orders;

use Illuminate\Database\Eloquent\Builder;

class SearchOrdersQuery
{
    public static function apply(Builder $query, ?string $search): Builder
    {
        if (!$search) {
            return $query;
        }

        return $query->where(function (Builder $q) use ($search) {
            $q->where('id', 'like', "%{$search}%")
                ->orWhereHas('items.product', function (Builder $productQuery) use ($search) {
                    $productQuery->where('name', 'like', "%{$search}%");
                });
        });
    }
}
