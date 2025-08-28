<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\Review;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReviewTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_submit_review_for_product()
    {
        $user = User::factory()->create();
        $product = Product::factory()->create();
        $order = Order::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->post(route('reviews.store'), [
            'product_id' => $product->id,
            'order_id' => $order->id,
            'rating' => 5,
            'comment' => 'Great product!',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('reviews', [
            'user_id' => $user->id,
            'product_id' => $product->id,
            'order_id' => $order->id,
            'rating' => 5,
            'comment' => 'Great product!',
        ]);

        // Check that product average rating and review count were updated
        $product->refresh();
        $this->assertEquals(5.0, $product->average_rating);
        $this->assertEquals(1, $product->reviews_count);
    }

    public function test_user_cannot_submit_duplicate_review()
    {
        $user = User::factory()->create();
        $product = Product::factory()->create();
        $order = Order::factory()->create(['user_id' => $user->id]);

        // Create first review
        Review::factory()->create([
            'user_id' => $user->id,
            'product_id' => $product->id,
            'order_id' => $order->id,
            'rating' => 4,
        ]);

        // Try to submit second review
        $response = $this->actingAs($user)->post(route('reviews.store'), [
            'product_id' => $product->id,
            'order_id' => $order->id,
            'rating' => 5,
            'comment' => 'Another review',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('error');
        $response->assertSessionHas('error', 'You have already reviewed this product for this order.');
    }

    public function test_average_rating_calculation_with_multiple_reviews()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $product = Product::factory()->create();
        $order1 = Order::factory()->create(['user_id' => $user1->id]);
        $order2 = Order::factory()->create(['user_id' => $user2->id]);

        // Submit reviews
        $this->actingAs($user1)->post(route('reviews.store'), [
            'product_id' => $product->id,
            'order_id' => $order1->id,
            'rating' => 4,
        ]);

        $this->actingAs($user2)->post(route('reviews.store'), [
            'product_id' => $product->id,
            'order_id' => $order2->id,
            'rating' => 5,
        ]);

        $product->refresh();
        $this->assertEquals(4.5, $product->average_rating);
        $this->assertEquals(2, $product->reviews_count);
    }

    public function test_user_cannot_review_product_for_another_users_order()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $product = Product::factory()->create();
        $order = Order::factory()->create(['user_id' => $user1->id]);

        $response = $this->actingAs($user2)->post(route('reviews.store'), [
            'product_id' => $product->id,
            'order_id' => $order->id,
            'rating' => 5,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('error');
        $response->assertSessionHas('error', 'Order not found.');
    }

    public function test_rating_validation()
    {
        $user = User::factory()->create();
        $product = Product::factory()->create();
        $order = Order::factory()->create(['user_id' => $user->id]);

        // Test invalid rating
        $response = $this->actingAs($user)->post(route('reviews.store'), [
            'product_id' => $product->id,
            'order_id' => $order->id,
            'rating' => 6, // Invalid rating
        ]);

        $response->assertSessionHasErrors(['rating']);
    }
}
