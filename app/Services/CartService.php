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

        $cart = $this->cartModel->where(function ($query) use ($userId, $sessionId) {
            $query->where('user_id', $userId)
                  ->orWhere('session_id', $sessionId);
        })
        ->where('status', 'active')
        ->first();

        if (!$cart) {
            $cart = $this->cartModel->create([
                'user_id' => $userId,
                'session_id' => $sessionId,
                'status' => 'active'
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
            $item->delete();
            return $item;
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

    public function transferGuestCart(): void
    {
        if (!Auth::check()) {
            return;
        }

        $sessionId = session()->getId();
        $guestCart = $this->cartModel->where('session_id', $sessionId)
            ->where('user_id', null)
            ->where('status', 'active')
            ->first();

        if (!$guestCart) {
            return;
        }

        $userCart = $this->getCurrentCart();

        // Transfer items from guest cart to user cart
        foreach ($guestCart->items as $item) {
            $this->addItem($item->product, $item->quantity);
        }

        // Delete the guest cart
        $guestCart->delete();
    }
}
