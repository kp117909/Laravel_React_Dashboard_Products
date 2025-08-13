<?php

namespace App\Http\Requests\Cart;

use Illuminate\Foundation\Http\FormRequest;

class CartUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'quantity' => 'required|integer|min:1|max:1000',
        ];
    }

    public function messages()
    {
        return [
            'quantity.required' => 'Please specify a quantity.',
            'quantity.integer' => 'Quantity must be a number.',
            'quantity.min' => 'Quantity must be at least 1.',
            'quantity.max' => 'Quantity cannot exceed 1000.',
        ];
    }
}
