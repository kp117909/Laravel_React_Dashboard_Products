<?php

namespace App\Queries;

use Illuminate\Database\Eloquent\Builder;

class SearchUsersQuery
{
       public static function apply(Builder $query, ?string $search): Builder
    {
        return $query->where(function (Builder $query) use ($search) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
                ->orWhereHas('roles', function (Builder $query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                });
        });
    }
}
