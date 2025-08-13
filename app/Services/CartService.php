<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class CartService
{
    protected Cart $cartModel;

    public function __construct(Cart $cartModel)
    {
        $this->cartModel = $cartModel;
    }

    public function getCurrentCart(): Cart
    {
        $userId = Auth::id();
        $sessionId = session()->getId();

        // Prefer a user cart when authenticated; otherwise use a guest cart by session
        if ($userId) {
            $cart = $this->cartModel
                ->where('user_id', $userId)
                ->where('status', 'active')
                ->first();

            if (!$cart) {
                $cart = $this->cartModel->create([
                    'user_id' => $userId,
                    'session_id' => $sessionId,
                    'status' => 'active',
                ]);
            }

            return $cart;
        }

        $cart = $this->cartModel
            ->where('session_id', $sessionId)
            ->whereNull('user_id')
            ->where('status', 'active')
            ->first();

        if (!$cart) {
            $cart = $this->cartModel->create([
                'user_id' => null,
                'session_id' => $sessionId,
                'status' => 'active',
            ]);
        }

        return $cart;
    }

    public function addItem(Product $product, int $quantity = 1): CartItem
    {
        $cart = $this->getCurrentCart();

        $cartItem = $cart->items()->where('product_id', $product->id)->first();

        if ($cartItem) {
            $cartItem->update([
                'quantity' => $cartItem->quantity + $quantity
            ]);
        } else {
            $cartItem = $cart->items()->create([
                'product_id' => $product->id,
                'quantity' => $quantity
            ]);
        }

        return $cartItem->load('product');
    }

    public function updateQuantity(CartItem $item, int $quantity): CartItem
    {
        if ($quantity <= 0) {
            throw new \InvalidArgumentException('Quantity must be greater than 0.');
        }

        $item->update(['quantity' => $quantity]);
        return $item->load('product');
    }

    public function removeItem(CartItem $item): bool
    {
        return $item->delete();
    }

    public function clearCart(): bool
    {
        $cart = $this->getCurrentCart();
        return $cart->items()->delete();
    }

    public function getCartSummary(): array
    {
        $cart = $this->getCurrentCart();

        return [
            'items' => $cart->items()->with('product')->get(),
            'total' => $cart->total,
            'item_count' => $cart->items()->sum('quantity')
        ];
    }

    public function transferGuestCart(?string $sourceSessionId = null): void
    {
        if (!Auth::check()) {
            return;
        }

        $sessionId = $sourceSessionId ?? session()->getId();
        $guestCart = $this->cartModel->with(['items.product'])
            ->where('session_id', $sessionId)
            ->whereNull('user_id')
            ->where('status', 'active')
            ->first();

        if (!$guestCart) {
            return;
        }

        // Create or get user cart explicitly
        $userId = Auth::id();
        $userCart = $this->cartModel
            ->where('user_id', $userId)
            ->where('status', 'active')
            ->first();

        if (!$userCart) {
            $userCart = $this->cartModel->create([
                'user_id' => $userId,
                'session_id' => session()->getId(),
                'status' => 'active',
            ]);
        }

        // Transfer items from guest cart to user cart
        foreach ($guestCart->items as $item) {
            $existingItem = $userCart->items()->where('product_id', $item->product_id)->first();

            if ($existingItem) {
                $existingItem->update(['quantity' => $existingItem->quantity + $item->quantity]);
            } else {
                $userCart->items()->create([
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity
                ]);
            }
        }

        // Delete the guest cart
        $guestCart->delete();
    }
}
