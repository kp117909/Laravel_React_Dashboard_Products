<?php

namespace Database\Factories;

use App\Models\DiscountCode;
use Illuminate\Database\Eloquent\Factories\Factory;

class DiscountCodeFactory extends Factory
{
    protected $model = DiscountCode::class;

    public function definition(): array
    {
        return [
            'code' => strtoupper($this->faker->unique()->bothify('??##??')),
            'description' => $this->faker->sentence(),
            'discount_percentage' => $this->faker->randomFloat(2, 5, 50),
            'minimum_amount' => $this->faker->randomFloat(2, 0, 100),
            'max_uses' => $this->faker->optional(0.3)->numberBetween(10, 1000),
            'used_count' => 0,
            'valid_from' => $this->faker->optional(0.2)->dateTimeBetween('-1 month', 'now'),
            'valid_until' => $this->faker->optional(0.2)->dateTimeBetween('now', '+6 months'),
            'is_active' => $this->faker->boolean(80),
        ];
    }

    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
            'valid_from' => null,
            'valid_until' => null,
        ]);
    }

    public function expired(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
            'valid_until' => $this->faker->dateTimeBetween('-1 month', '-1 day'),
        ]);
    }

    public function future(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
            'valid_from' => $this->faker->dateTimeBetween('+1 day', '+1 month'),
        ]);
    }
}
