<?php

namespace App\Queries\Products;

use Illuminate\Database\Eloquent\Builder;

class SearchProductsQuery
{
    public static function apply(Builder $query, ?string $search = null, array $options = []): Builder
    {

        if ($search) {
            $query->where(function (Builder $q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhereHas('category', function (Builder $q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            });
        }

        if (!empty($options['category_id'])) {
            $query->where('category_id', $options['category_id']);
        }

        return $query;


    }
}

