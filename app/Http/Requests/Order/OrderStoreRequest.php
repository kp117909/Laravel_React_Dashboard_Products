<?php

namespace App\Http\Requests\Order;

use Illuminate\Foundation\Http\FormRequest;

class OrderStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Or add your authorization logic
    }

    public function rules(): array
    {

        return [

        ];

    }

    public function messages(): array
    {
        return [

        ];
    }
}
