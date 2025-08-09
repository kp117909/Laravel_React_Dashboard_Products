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
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'years'      => array_map('intval', $this->input('years', [])),
            'categories' => array_map('intval', Arr::flatten($this->input('categories', []))),
        ]);
    }

    /** Return normalized filters (flat int arrays) */
    public function filters(): array
    {
        return [
            'years'      => $this->input('years', []),
            'categories' => $this->input('categories', []),
        ];
    }
}
