<?php

namespace App\Services;

use App\Repositories\ReviewRepository;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;

class ReviewService
{
    public function __construct(
        private ReviewRepository $reviewRepository
    ) {}

    public function createReview(array $data): bool
    {
        // Check if user owns the order using the model's protected method
        $order = Order::findOwnedBy($data['order_id'], Auth::id());

        if (!$order) {
            throw new \Exception('Order not found.');
        }

        // Check if user has already reviewed this product for this order
        $existingReview = $this->reviewRepository->findByUserProductAndOrder(
            Auth::id(),
            $data['product_id'],
            $data['order_id']
        );

        if ($existingReview) {
            throw new \Exception('You have already reviewed this product for this order.');
        }

        // Create the review - model events will handle product rating updates
        $this->reviewRepository->create([
            'user_id' => Auth::id(),
            'product_id' => $data['product_id'],
            'order_id' => $data['order_id'],
            'rating' => $data['rating'],
            'comment' => $data['comment'] ?? null,
        ]);

        return true;
    }



    public function getReviewedProductsForOrder(int $orderId, int $userId): array
    {
        return $this->reviewRepository->getReviewedProductsForOrder($orderId, $userId)->toArray();
    }
}
