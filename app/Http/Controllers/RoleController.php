<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Http\Requests\Role\StoreRoleRequest;
use App\Http\Requests\Role\UpdateRoleRequest;
use App\Repositories\RoleRepository;
use App\Services\RoleService;

class RoleController extends Controller
{
    protected RoleRepository $role;
    protected RoleService $roleService;

    public function __construct(RoleService $roleService, RoleRepository $role)
    {
        $this->role = $role;
        $this->roleService = $roleService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $roles = $this->role->allWithPermissions(
            perPage: $request->input('per_page', 10),
            search: $request->input('search'),
            options: $request->only(['sort', 'direction'])
        );

        return Inertia::render('roles/index', [
            'roles' => $roles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permissions = Permission::all(['id', 'name']);
        return Inertia::render('roles/create', [
            'permissions' => $permissions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request)
    {
        $this->roleService->create($request->validated());

        return to_route('roles.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $role = Role::with('permissions')->findOrFail($id);
        $permissions = Permission::all(['id', 'name']);

        return Inertia::render('roles/edit', [
            'role' => $role,
            'permissions' => $permissions
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, Role $role)
    {
        $this->roleService->update($request->validated(), $role);

        return to_route('roles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $this->roleService->delete($id);

         return to_route('roles.index');
    }
}
