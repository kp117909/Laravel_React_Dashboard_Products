<?php
namespace App\Repositories;

use App\Models\Role;
use App\Queries\Roles\SearchRolesQuery;
use App\Queries\Roles\SortableRolesQuery;

class RoleRepository
{
    protected Role $model;

    public function __construct(Role $role)
    {
        $this->model = $role;
    }

    public function allWithPermissions(int $perPage = 10, ?string $search = null, array $options = [])
    {
        $query = $this->model->with('permissions');
        $query = SearchRolesQuery::apply($query, $search, $options);


        if (!empty($options['sort']) && is_string($options['sort'])) {
            $query = SortableRolesQuery::apply(
                $query,
                $options['sort'],
                $options['direction'] ?? 'asc'
            );
        }

        return $query->paginate($perPage)->withQueryString();
    }
}
