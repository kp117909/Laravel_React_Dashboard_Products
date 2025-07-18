<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->words(2, true),
            'description' => $this->faker->sentence(),
            'price' => $this->faker->randomFloat(2, 10, 1500),
            'average_rating' => $this->faker->optional()->randomFloat(1, 1, 5),
            'reviews_count' => $this->faker->numberBetween(0, 100),
            'is_available' => $this->faker->boolean(),
            'image' => 'products/' . $this->faker->word() . '.png',
            'category_id' => Category::inRandomOrder()->first()?->id ?? Category::factory(),
        ];
    }
}
