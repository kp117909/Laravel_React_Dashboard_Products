<?php

namespace App\Services;

use App\Repositories\OrderRepository;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class OrderService
{
    protected OrderRepository $orderRepository;
    protected CartService $cartService;

    public function __construct(OrderRepository $orderRepository, CartService $cartService)
    {
        $this->orderRepository = $orderRepository;
        $this->cartService = $cartService;
    }

    public function getUserOrders(int $userId, int $perPage = 10, string $search = null, array $options = []): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->orderRepository->findByUserId($userId, $perPage, $search, $options);
    }

    public function getUserOrder(int $orderId, int $userId): ?Order
    {
        return $this->orderRepository->findByIdAndUserId($orderId, $userId);
    }

    public function getAllOrders(int $perPage = 10, string $search = null, array $options = []): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->orderRepository->getAllOrders($perPage, $search, $options);
    }

    public function getOrder(int $orderId): ?Order
    {
        return $this->orderRepository->getOrder($orderId);
    }

    public function createFromCart(Cart $cart)
    {
        // Validate cart has items
        if ($cart->items->isEmpty()) {
            throw new \Exception('Your cart is empty.');
        }

        // Validate cart belongs to authenticated user
        if ($cart->user_id !== Auth::id()) {
            throw new \Exception('Cart does not belong to current user.');
        }

        // Validate cart total is positive
        if ($cart->total <= 0) {
            throw new \Exception('Cart total must be greater than zero.');
        }

        // Validate all products are still available
        foreach ($cart->items as $item) {
            if (!$item->product->is_published) {
                throw new \Exception("Product '{$item->product->name}' is no longer available.");
            }
        }

        $order = $this->orderRepository->create([
            'user_id' => Auth::id(),
            'cart_id' => $cart->id,
            'total' => $cart->total,
        ]);

        $cart->items->each(function (CartItem $item) use ($order) {
            $order->items()->create([
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->product->price, // Capture price at time of purchase
            ]);
        });

        $cart->update(['status' => 'completed']);

        return $order;
    }
}
