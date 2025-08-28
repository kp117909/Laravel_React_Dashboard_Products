<?php

namespace App\Http\Controllers;

use App\Services\CartService;
use App\Services\OrderService;
use App\Services\ReviewService;
use App\Http\Requests\Order\OrderStoreRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;
class OrderController extends Controller
{
    public function __construct(
        private CartService $cartService,
        private OrderService $orderService,
        private ReviewService $reviewService
    ) {}

    public function store(OrderStoreRequest $request)
    {
        $cart = $this->cartService->getCurrentCart();
        if ($cart->items->isEmpty()) {
            return back()->with([
                'error' => 'Your cart is empty.',
                'cart' => $this->cartService->getCartSummary()
            ]);
        }

        if (!Auth::user()) {
            return redirect()->route('login')->with([
                'error' => 'You must be logged in to checkout.',
                'cart' => $this->cartService->getCartSummary()
            ]);
        }

        try {
            $request->merge([
                'cart_id' => $cart->id,
                'user_id' => Auth::id(),
                'total' => $cart->total,
            ]);

            $order = $this->orderService->createFromCart($cart);

            return redirect()->route('orders.show', $order)->with([
                'success' => 'Order placed successfully!',
                'cart' => $this->cartService->getCartSummary()
            ]);
        } catch (\Exception $e) {
            return back()->with([
                'error' => 'Failed to place order. Please try again.',
                'cart' => $this->cartService->getCartSummary()
            ]);
        }
    }

    public function index(Request $request)
    {
        $orders = $this->orderService->getUserOrders(
            userId: Auth::id(),
            perPage: $request->input('per_page', 3),
            search: $request->input('search'),
            options: $request->only(['sort', 'direction'])
        );

        return Inertia::render('orders/index', [
            'orders' => $orders
        ]);
    }

    public function show(int $orderId)
    {
        $order = $this->orderService->getUserOrder($orderId, Auth::id());

        if (!$order) {
            abort(404);
        }

        $reviewedProducts = $this->reviewService->getReviewedProductsForOrder($orderId, Auth::id());
        $order->reviewed_products = $reviewedProducts;

        return Inertia::render('orders/show', [
            'order' => $order
        ]);
    }
}
