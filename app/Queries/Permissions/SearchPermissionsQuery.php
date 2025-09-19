<?php

namespace App\Queries\Permissions;

use Illuminate\Database\Eloquent\Builder;

class SearchPermissionsQuery
{
    public static function apply(Builder $query, ?string $search = null, array $filters = []): Builder
    {
        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }

        return $query;
    }
}
