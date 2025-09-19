<?php

namespace App\Queries\Permissions;

use Illuminate\Database\Eloquent\Builder;

class SortablePermissionsQuery
{
    protected static array $sortableFields = [
        'name',
        'created_at',
    ];

    public static function apply(Builder $query, string $sort, string $direction = 'asc'): Builder
    {
        if (!in_array($sort, self::$sortableFields)) {
            return $query;
        }

        return $query->orderBy($sort, $direction);
    }
}
