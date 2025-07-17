<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    protected $fillable = [
        'name',
        'description',
        'type',
        'price',
        'average_rating',
        'reviews_count',
        'is_available',
        'image',
        'category_id',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'avarage_rating' => 'float',
        'reviews_count' => 'integer',
        'is_available' => 'boolean',
    ];
}
