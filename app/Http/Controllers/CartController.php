<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use App\Services\CartService;
use Inertia\Inertia;
use App\Http\Requests\Cart\CartAddRequest;
use App\Http\Requests\Cart\CartUpdateRequest;

class CartController extends Controller
{
    public function __construct(
        private CartService $cartService
    ) {}

    public function index()
    {
        $summary = $this->cartService->getCartSummary();

        return Inertia::render('cart/index', [
            'cart' => $summary
        ]);
    }

    public function add(CartAddRequest $request, Product $product)
    {
        // Check if product is published
        if (!$product->is_published) {
            return back()->with([
                'error' => 'This product is not available for purchase.',
                'cart' => $this->cartService->getCartSummary()
            ]);
        }

        $this->cartService->addItem($product, $request->quantity);

        return back()->with([
            'success' => 'Product added to cart',
            'cart' => $this->cartService->getCartSummary()
        ]);
    }

    public function update(CartUpdateRequest $request, CartItem $cartItem)
    {
        // Ensure the cart item belongs to the current cart (user or guest)
        $currentCartId = $this->cartService->getCurrentCart()->id;
        if ($cartItem->cart_id !== $currentCartId) {
            return back()->with([
                'error' => 'Invalid cart item',
                'cart' => $this->cartService->getCartSummary()
            ]);
        }

        try {
            $this->cartService->updateQuantity($cartItem, $request->quantity);
        } catch (\InvalidArgumentException $e) {
            return back()->with([
                'error' => $e->getMessage(),
                'cart' => $this->cartService->getCartSummary()
            ]);
        }

        // Stay on the previous page (shop page)
        return back()->with([
            'success' => 'Cart updated',
            'cart' => $this->cartService->getCartSummary()
        ]);
    }

    public function remove(CartItem $cartItem)
    {
        // Ensure the cart item belongs to the current cart (user or guest)
        $currentCartId = $this->cartService->getCurrentCart()->id;
        if ($cartItem->cart_id !== $currentCartId) {
            return back()->with([
                'error' => 'Invalid cart item',
                'cart' => $this->cartService->getCartSummary()
            ]);
        }

        $this->cartService->removeItem($cartItem);

        // Stay on the previous page (shop page)
        return back()->with([
            'success' => 'Item removed from cart',
            'cart' => $this->cartService->getCartSummary()
        ]);
    }

    public function clear()
    {
        $this->cartService->clearCart();

        // Stay on the previous page (shop page)
        return back()->with([
            'success' => 'Cart cleared',
            'cart' => $this->cartService->getCartSummary()
        ]);
    }
}
