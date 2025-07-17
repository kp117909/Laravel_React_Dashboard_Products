<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

   public function rules(): array
    {
       $role = $this->route('role');
       return [
        'name' => [
            'required',
            'string',
            Rule::unique('roles', 'name')->ignore($role, 'id')
        ],
        'permissions' => 'array',
        'permissions.*' => 'exists:permissions,id',
    ];
    }

}

