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

       return [
        'name' => [
            'required',
            'string',
            Rule::unique('roles')->ignoreModel($this->role),
        ],
        'permissions' => 'array',
        'permissions.*' => 'exists:permissions,id',
    ];
    }

}

