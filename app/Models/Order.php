<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'cart_id',
        'total',
    ];

    protected $casts = [
        'total' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function getTotalAttribute($value): float
    {
        return (float) $value;
    }

    /**
     * Check if the given user owns this order
     */
    protected function isOwnedBy(int $userId): bool
    {
        return $this->user_id === $userId;
    }

    /**
     * Find an order by ID and check if it's owned by the given user
     */
    public static function findOwnedBy(int $orderId, int $userId): ?self
    {
        $order = self::find($orderId);
        return $order && $order->isOwnedBy($userId) ? $order : null;
    }
}
