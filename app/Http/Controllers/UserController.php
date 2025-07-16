<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use App\Services\UserService;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('roles')->get();
        return Inertia::render('users/index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::all(['id', 'name']);
        return Inertia::render('users/create',[
            'roles' => $roles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $this->userService->create($request->validated());

        return to_route('users.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $user = User::find($id);
        return Inertia::render('users/show', [
            'user' =>$user,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $user = User::find($id);
        return Inertia::render('users/edit', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, int $id)
    {
        $this->userService->update($request->validated(), $id);

        return to_route('users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $this->userService->delete($id);

        return to_route('users.index');
    }
}
