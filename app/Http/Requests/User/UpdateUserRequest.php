<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $userId = $this->route('user');

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                 Rule::unique('users')->ignore($userId)
            ],
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($userId),
            ],
            'role' => 'required|integer|exists:roles,id',
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ];
    }
}
