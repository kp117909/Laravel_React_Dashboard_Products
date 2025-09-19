<?php

namespace Database\Factories;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class CartItemFactory extends Factory
{
    protected $model = CartItem::class;

    public function definition(): array
    {
        return [
            'cart_id' => Cart::factory(),
            'product_id' => Product::inRandomOrder()->first()?->id ?? Product::factory(),
            'quantity' => $this->faker->numberBetween(1, 5),
        ];
    }

    /**
     * Create multiple unique cart items for a cart
     */
    public function uniqueForCart(Cart $cart, int $count = 3): array
    {
        $products = Product::inRandomOrder()->limit($count)->get();

        if ($products->count() < $count) {
            // Create additional products if not enough exist
            $needed = $count - $products->count();
            $additionalProducts = Product::factory()->count($needed)->create();
            $products = $products->merge($additionalProducts);
        }

        $cartItems = [];
        foreach ($products->take($count) as $product) {
            $cartItems[] = $this->forCart($cart)->forProduct($product)->create();
        }

        return $cartItems;
    }

    public function forCart(Cart $cart): self
    {
        return $this->state(function (array $attributes) use ($cart) {
            return [
                'cart_id' => $cart->id,
            ];
        });
    }

    public function forProduct(Product $product): self
    {
        return $this->state(function (array $attributes) use ($product) {
            return [
                'product_id' => $product->id,
            ];
        });
    }
}
