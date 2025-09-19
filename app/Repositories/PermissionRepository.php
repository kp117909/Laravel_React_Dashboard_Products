<?php

namespace App\Repositories;

use Spatie\Permission\Models\Permission;
use App\Queries\Permissions\SearchPermissionsQuery;
use App\Queries\Permissions\SortablePermissionsQuery;

class PermissionRepository
{
    protected Permission $model;

    public function __construct(Permission $permission)
    {
        $this->model = $permission;
    }

    public function all(int $perPage = 10, ?string $search = null, array $options = [])
    {
        $query = $this->model->query();
        $query = SearchPermissionsQuery::apply($query, $search, $options);

        if (!empty($options['sort']) && is_string($options['sort'])) {
            $query = SortablePermissionsQuery::apply(
                $query,
                $options['sort'],
                $options['direction'] ?? 'asc'
            );
        }

        return $query->paginate($perPage)->withQueryString();
    }
}
