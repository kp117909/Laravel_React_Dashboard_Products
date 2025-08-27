<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cart extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'session_id',
        'status',
        'discount_code',
        'discount_amount',
        'subtotal',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'discount_amount' => 'decimal:2',
        'subtotal' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    public function getSubtotalAttribute($value): float
    {
        if ($value === null || (float) $value === 0.0) {
            $this->load('items.product');

            return $this->items->sum(function ($item) {
                return $item->product->price * $item->quantity;
            });
        }

        return (float) $value;
    }

    public function getTotalAttribute(): float
    {
        return max(0, $this->subtotal - $this->discount_amount);
    }

    public function getDiscountPercentageAttribute(): float
    {
        if ($this->subtotal <= 0) {
            return 0;
        }

        return round(($this->discount_amount / $this->subtotal) * 100, 2);
    }

    public function getDiscountAmountAttribute($value): float
    {
        return (float) $value;
    }
}
