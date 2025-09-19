<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use App\Services\PermissionService;
use App\Repositories\PermissionRepository;
use App\Http\Requests\Permission\StorePermissionRequest;
use App\Http\Requests\Permission\UpdatePermissionRequest;

class PermissionController extends Controller
{
    protected PermissionService $permissionService;
    protected PermissionRepository $permissionRepository;

    public function __construct(PermissionService $permissionService, PermissionRepository $permissionRepository)
    {
        $this->permissionService = $permissionService;
        $this->permissionRepository = $permissionRepository;
    }

    public function index(Request $request)
    {
        $permissions = $this->permissionRepository->all(
            perPage: $request->input('per_page', 10),
            search: $request->input('search'),
            options: $request->only(['sort', 'direction'])
        );

        return Inertia::render('permissions/index', [
            'permissions' => $permissions
        ]);
    }

    public function create()
    {
        return Inertia::render('permissions/create');
    }

    public function store(StorePermissionRequest $request)
    {
        $this->permissionService->create($request->all());
        return to_route('permissions.index');
    }

    public function edit(int $id)
    {
        $permission = Permission::findOrFail($id);
        return Inertia::render('permissions/edit', [
            'permission' => $permission
        ]);
    }

    public function update(UpdatePermissionRequest $request, int $id)
    {
        $permission = Permission::findOrFail($id);
        $permission = $this->permissionService->update($request->all(), $permission);
        return to_route('permissions.index');
    }


    public function destroy(int $id)
    {
        $permission = Permission::findOrFail($id);
        $permission->delete();
        return to_route('permissions.index');
    }
}
