<?php

namespace App\Http\Requests\Cart;

use Illuminate\Foundation\Http\FormRequest;

class ApplyDiscountCodeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'code' => 'required|string|max:50',
        ];
    }

    public function messages(): array
    {
        return [
            'code.required' => 'Discount code is required',
            'code.string' => 'Discount code must be a string',
            'code.max' => 'Discount code cannot exceed 50 characters',
        ];
    }
}
