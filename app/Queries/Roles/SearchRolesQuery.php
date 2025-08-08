<?php

namespace App\Queries\Roles;

use Illuminate\Database\Eloquent\Builder;

class SearchRolesQuery
{
    public static function apply(Builder $query, ?string $search = null, array $filters = []): Builder
    {
        if ($search) {
            $query->where(function (Builder $q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhereHas('permissions', function (Builder $q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            });
        }

        return $query;
    }
}
