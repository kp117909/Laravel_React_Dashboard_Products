<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
        'order_id',
        'rating',
        'comment',
    ];

    protected $casts = [
        'rating' => 'integer',
    ];

    protected static function booted()
    {
        static::created(function ($review) {
            $review->updateProductRating();
        });

        static::updated(function ($review) {
            $review->updateProductRating();
        });

        static::deleted(function ($review) {
            $review->updateProductRating();
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    private function updateProductRating(): void
    {
        $product = $this->product;
        if (!$product) {
            return;
        }

        $reviews = $product->reviews;
        $averageRating = $reviews->avg('rating') ?? 0;
        $reviewsCount = $reviews->count();

        $product->update([
            'average_rating' => round($averageRating, 2),
            'reviews_count' => $reviewsCount,
        ]);
    }
}
