<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Order;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\DiscountCode;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        // Only seed if no orders exist
        if (Order::count() > 0) {
            return;
        }

        // Find the kpolak491 user
        $user = User::where('email', 'kpolak491@gmail.com')->first();

        if (!$user) {
            $this->command->error('User kpolak491@gmail.com not found. Please run the database seeder first.');
            return;
        }

        // Get all available products
        $products = Product::where('is_published', true)->get();

        if ($products->isEmpty()) {
            $this->command->error('No published products found. Please run the ProductSeeder first.');
            return;
        }

        // Get available discount codes
        $discountCodes = DiscountCode::where('is_active', true)->get();

        // Create 15-25 random orders
        $orderCount = rand(15, 25);

        for ($i = 0; $i < $orderCount; $i++) {
            // Create a cart for this order
            $cart = Cart::factory()->forUser($user)->create([
                'status' => 'completed',
                'created_at' => now()->subDays(rand(1, 180)), // Random date within last 6 months
            ]);

            // Add 1-4 random products to the cart
            $cartItems = [];
            $cartTotal = 0;
            $selectedProducts = $products->random(rand(1, 4));

            foreach ($selectedProducts as $product) {
                $quantity = rand(1, 3);
                $price = $product->price;
                $itemTotal = $price * $quantity;
                $cartTotal += $itemTotal;

                $cartItem = CartItem::factory()->forCart($cart)->forProduct($product)->create([
                    'quantity' => $quantity,
                ]);

                $cartItems[] = $cartItem;
            }

            // Randomly apply a discount code (30% chance)
            $discountAmount = 0;
            $discountCode = null;

            if (rand(1, 100) <= 30 && $discountCodes->isNotEmpty()) {
                $discountCode = $discountCodes->random();
                $discountAmount = ($cartTotal * $discountCode->discount_percentage) / 100;

                $cart->update([
                    'discount_code' => $discountCode->code,
                    'discount_amount' => $discountAmount,
                ]);
            }

            $cart->update([
                'subtotal' => $cartTotal,
            ]);

            // Create the order
            $order = Order::factory()->forUser($user)->forCart($cart)->create([
                'total' => max(0, $cartTotal - $discountAmount),
                'status' => $this->getRandomStatus(),
                'created_at' => $cart->created_at,
                'updated_at' => $cart->created_at,
            ]);

            // Create order items
            foreach ($cartItems as $cartItem) {
                OrderItem::factory()->forOrder($order)->forProduct($cartItem->product)->create([
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->product->price,
                ]);
            }

            $this->command->info("Created order #{$order->id} with " . count($cartItems) . " items for {$user->name}");
        }

        $this->command->info("Successfully created {$orderCount} orders for user {$user->name}");
    }

    private function getRandomStatus(): string
    {
        $statuses = [
            'pending' => 20,      // 20% chance
            'processing' => 25,   // 25% chance
            'shipped' => 30,      // 30% chance
            'delivered' => 20,    // 20% chance
            'cancelled' => 5,     // 5% chance
        ];

        $random = rand(1, 100);
        $cumulative = 0;

        foreach ($statuses as $status => $probability) {
            $cumulative += $probability;
            if ($random <= $cumulative) {
                return $status;
            }
        }

        return 'pending';
    }
}
