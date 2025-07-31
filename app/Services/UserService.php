<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function create(array $data): User
    {
        $data['password'] = Hash::make($data['password']);
        $user = $this->userRepository->create($data);

        if (isset($data['role'])) {
            $user->assignRole($data['role']);
        }

        return $user;
    }

    public function update(array $data, int $id): User
    {
        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $roleName = $data['role'] ?? null;
        unset($data['role']);

        $user = $this->userRepository->update($id, $data);

        if ($roleName) {
            $user->syncRoles($roleName);
        }

        return $user;
    }

    public function delete(int $id)
    {
        $this->userRepository->delete($id);
    }
}

