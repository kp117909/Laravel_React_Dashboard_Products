<?php

namespace Database\Factories;

use App\Models\OrderItem;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderItemFactory extends Factory
{
    protected $model = OrderItem::class;

    public function definition(): array
    {
        $product = Product::inRandomOrder()->first();

        return [
            'order_id' => Order::factory(),
            'product_id' => $product?->id ?? Product::factory(),
            'quantity' => $this->faker->numberBetween(1, 5),
            'price' => $product?->price ?? $this->faker->randomFloat(2, 5, 100),
        ];
    }

    public function forOrder(Order $order): self
    {
        return $this->state(function (array $attributes) use ($order) {
            return [
                'order_id' => $order->id,
            ];
        });
    }

    public function forProduct(Product $product): self
    {
        return $this->state(function (array $attributes) use ($product) {
            return [
                'product_id' => $product->id,
                'price' => $product->price,
            ];
        });
    }
}
