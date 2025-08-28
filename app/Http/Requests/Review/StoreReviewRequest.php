<?php

namespace App\Http\Requests\Review;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Order;

class StoreReviewRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'product_id' => [
                'required',
                'integer',
                'exists:products,id'
            ],
            'order_id' => [
                'required',
                'integer',
                'exists:orders,id'
            ],
            'rating' => [
                'required',
                'integer',
                'min:0',
                'max:5'
            ],
            'comment' => [
                'nullable',
                'string',
                'max:1000'
            ],
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'product_id.exists' => 'The selected product does not exist.',
            'order_id.exists' => 'The selected order does not exist.',
            'rating.min' => 'Rating must be at least 0.',
            'rating.max' => 'Rating cannot exceed 5.',
            'comment.max' => 'Comment cannot exceed 1000 characters.',
        ];
    }


}
