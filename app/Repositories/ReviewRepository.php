<?php

namespace App\Repositories;

use App\Models\Review;
use Illuminate\Support\Collection;

class ReviewRepository
{
    protected Review $model;

    public function __construct(Review $review)
    {
        $this->model = $review;
    }

    public function create(array $data): Review
    {
        return $this->model->create($data);
    }

    public function findByUserProductAndOrder(int $userId, int $productId, int $orderId): ?Review
    {
        return $this->model->where([
            'user_id' => $userId,
            'product_id' => $productId,
            'order_id' => $orderId,
        ])->first();
    }

    public function getProductReviews(int $productId): Collection
    {
        return $this->model->where('product_id', $productId)->get();
    }

    public function getReviewedProductsForOrder(int $orderId, int $userId): Collection
    {
        return $this->model->where('order_id', $orderId)
            ->where('user_id', $userId)
            ->pluck('product_id');
    }

    public function calculateProductRating(int $productId): array
    {
        $reviews = $this->getProductReviews($productId);

        $averageRating = $reviews->avg('rating') ?? 0;
        $reviewsCount = $reviews->count();

        return [
            'average_rating' => round($averageRating, 2),
            'reviews_count' => $reviewsCount,
        ];
    }
}
