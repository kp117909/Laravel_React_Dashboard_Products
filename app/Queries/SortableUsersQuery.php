<?php

namespace App\Queries;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class SortableUsersQuery
{
    protected static array $sortableFields = [
        'name',
        'email',
        'created_at',
        'role_name',

    ];


    public static function apply(Builder $query, string $sort, string $direction = 'asc'): Builder
    {
        if (!in_array($sort, self::$sortableFields)) {
            return $query;
        }


        if ($sort === 'role_name') {
            return $query->orderBy(
                DB::table('roles')
                    ->select('name')
                    ->join('model_has_roles', 'roles.id', '=', 'model_has_roles.role_id')
                    ->whereColumn('model_has_roles.model_id', 'users.id')
                    ->where('model_has_roles.model_type', \App\Models\User::class)
                    ->orderBy('name')
                    ->limit(1),
                $direction
            );
        }else{
            return $query->orderBy($sort, $direction);
        }

        return $query;
    }
}
