<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserRepository
{
    protected User $model;

    public function __construct(User $user)
    {
        $this->model = $user;
    }

    // Get user with pagination
    public function all($perPage = 15)
    {
        return $this->model->paginate($perPage);
    }

    // Get user with roles and pagination, sorted by newest
    public function allWithRoles($perPage = 15)
    {

        return $this->model->latest()->with('roles')->paginate($perPage);

    }

    // Find user by id with optional relations
    public function find(int $id, array $with = []): ?User
    {
        return $this->model
            ->with($with)
            ->find($id);
    }

    // Create new user
    public function create(array $data): User
    {
        return $this->model->create($data);
    }

    // Update user
    public function update(int $id, array $data): User
    {
        $user = $this->find($id);
        if (!$user) {
            throw new ModelNotFoundException("User with id $id not found");
        }

        $user->update($data);

        return $user;
    }

    // Delete user
    public function delete(int $id): bool
    {
        $user = $this->find($id);
        if (!$user) {
            return false;
        }
        return $user->delete();
    }

    // Get all users
    public function allUsers(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model
            ->latest()
            ->get();
    }

    // Get paginated users with relations
    public function paginateUsers(array $relations = [], int $perPage = 9): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->model
            ->with($relations)
            ->latest()
            ->paginate($perPage);
    }

    // Find user by id
    public function findUserById(array $relations = [], int $id): ?User
    {
        return $this->model->where('id', $id)
            ->with($relations)
            ->first();
    }

}

