<?php
namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;

class ProductIndexRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'years' => ['array'], 'years.*' => ['integer'],
            'categories' => ['array'], 'categories.*' => ['integer'],
            'search' => ['nullable', 'string', 'max:255'],
            'price_min' => ['nullable', 'numeric', 'min:0'],
            'price_max' => ['nullable', 'numeric', 'min:0', 'gte:price_min'],
            'available' => ['nullable', 'boolean'],
            'not_available' => ['nullable', 'boolean'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'years'      => array_map('intval', $this->input('years', [])),
            'categories' => array_map('intval', Arr::flatten($this->input('categories', []))),
            'available'  => filter_var($this->input('available', true), FILTER_VALIDATE_BOOLEAN),
            'not_available' => filter_var($this->input('not_available', true), FILTER_VALIDATE_BOOLEAN),
        ]);
    }

    /** Return normalized filters (flat int arrays) */
    public function filters(): array
    {
        return [
            'years'      => $this->input('years', []),
            'categories' => $this->input('categories', []),
            'search'     => $this->input('search'),
            'price_min'  => $this->input('price_min'),
            'price_max'  => $this->input('price_max'),
            'available'  => $this->input('available', true),
            'not_available' => $this->input('not_available', true),
        ];
    }
}
