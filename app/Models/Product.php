<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function getImageAttribute($value)
    {
        if ($value && Storage::disk('public')->exists($value)) {
            return asset('storage/' . $value);
        }
        return asset('images/vibeshop_no_photo.png');
    }

    public function getPriceAttribute($value)
    {
        return round((float) $value, 2);
    }

     // Published scope
    public function scopePublished(Builder $q): Builder
    {
        return $q->where('is_published', true);
    }

    // Filter: created_at year IN [..]
    public function scopeYearIn(Builder $q, array $years): Builder
    {
        $years = array_values(array_unique(array_map('intval', $years)));
        if (empty($years)) return $q;

        return $q->where(function (Builder $sub) use ($years) {
            foreach ($years as $i => $year) {
                $i === 0
                    ? $sub->whereYear('created_at', $year)
                    : $sub->orWhereYear('created_at', $year);
            }
        });
    }

    // Distinct years from created_at (for facet options)
    public function scopeDistinctYears(Builder $q)
    {
        return $q->selectRaw('YEAR(created_at) as year')
                 ->published()
                 ->distinct()
                 ->orderByDesc('year');
    }

    protected $fillable = [
        'name',
        'description',
        'type',
        'price',
        'average_rating',
        'reviews_count',
        'is_available',
        'is_published',
        'image',
        'category_id',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'average_rating' => 'float',
        'reviews_count' => 'integer',
        'is_available' => 'boolean',
        'is_published' => 'boolean',
    ];
}
