<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use App\Models\Cart;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'cart_id' => Cart::factory(),
            'total' => $this->faker->randomFloat(2, 10, 500),
            'status' => $this->faker->randomElement(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
            'created_at' => $this->faker->dateTimeBetween('-6 months', 'now'),
            'updated_at' => function (array $attributes) {
                return $attributes['created_at'];
            },
        ];
    }

    public function forUser(User $user): self
    {
        return $this->state(function (array $attributes) use ($user) {
            return [
                'user_id' => $user->id,
            ];
        });
    }

    public function forCart(Cart $cart): self
    {
        return $this->state(function (array $attributes) use ($cart) {
            return [
                'cart_id' => $cart->id,
                'total' => $cart->total,
            ];
        });
    }
}
