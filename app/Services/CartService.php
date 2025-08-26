<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\DiscountCode;
use Illuminate\Support\Facades\Auth;
use App\Repositories\OrderRepository;

class CartService
{
    protected Cart $cartModel;
    protected OrderRepository $orderRepository;

    public function __construct(Cart $cartModel, OrderRepository $orderRepository)
    {
        $this->cartModel = $cartModel;
        $this->orderRepository = $orderRepository;
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
        $this->updateCartTotals($cart);

        return [
            'items' => $cart->items()->with('product')->get(),
            'subtotal' => (float) ($cart->subtotal ?? 0),
            'discount_code' => $cart->discount_code,
            'discount_amount' => (float) ($cart->discount_amount ?? 0),
            'discount_percentage' => (float) ($cart->discount_percentage ?? 0),
            'total' => (float) ($cart->total ?? 0),
            'item_count' => (int) ($cart->items()->sum('quantity') ?? 0)
        ];
    }

    public function applyDiscountCode(string $code): array
    {
        $cart = $this->getCurrentCart();
        $discountCode = DiscountCode::findByCode($code);

        if (!$discountCode) {
            return [
                'success' => false,
                'message' => 'Invalid discount code'
            ];
        }

        if (!$discountCode->isValid()) {
            return [
                'success' => false,
                'message' => 'Discount code is not valid'
            ];
        }

        $subtotal = $cart->subtotal;
        if (!$discountCode->canBeAppliedToCart($subtotal)) {
            return [
                'success' => false,
                'message' => "Minimum order amount of $" . number_format($discountCode->minimum_amount, 2) . " required"
            ];
        }

        $discountAmount = $discountCode->calculateDiscount($subtotal);

        $cart->update([
            'discount_code' => $discountCode->code,
            'discount_amount' => $discountAmount,
            'subtotal' => $subtotal
        ]);

        return [
            'success' => true,
            'message' => "Discount code '{$discountCode->code}' applied successfully",
            'discount_amount' => $discountAmount,
            'discount_percentage' => $discountCode->discount_percentage
        ];
    }

    public function removeDiscountCode(): array
    {
        $cart = $this->getCurrentCart();

        $cart->update([
            'discount_code' => null,
            'discount_amount' => 0
        ]);

        return [
            'success' => true,
            'message' => 'Discount code removed'
        ];
    }

    private function updateCartTotals(Cart $cart): void
    {
        $subtotal = $cart->subtotal;

        // If there's a discount code, recalculate the discount
        if ($cart->discount_code) {
            $discountCode = DiscountCode::findByCode($cart->discount_code);
            if ($discountCode && $discountCode->canBeAppliedToCart($subtotal)) {
                $discountAmount = $discountCode->calculateDiscount($subtotal);
            } else {
                // Remove invalid discount code
                $cart->update([
                    'discount_code' => null,
                    'discount_amount' => 0
                ]);
                $discountAmount = 0;
            }
        } else {
            $discountAmount = 0;
        }

        $cart->update([
            'subtotal' => $subtotal,
            'discount_amount' => $discountAmount
        ]);
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
