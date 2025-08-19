<?php

namespace Database\Seeders;

use App\Models\DiscountCode;
use Illuminate\Database\Seeder;

class DiscountCodeSeeder extends Seeder
{
    public function run(): void
    {
        // Create some sample discount codes
        DiscountCode::create([
            'code' => 'SAVE10',
            'description' => '10% off your entire order',
            'discount_percentage' => 10.00,
            'minimum_amount' => 0.00,
            'max_uses' => 100,
            'used_count' => 0,
            'is_active' => true,
        ]);

        DiscountCode::create([
            'code' => 'SAVE20',
            'description' => '20% off orders over $50',
            'discount_percentage' => 20.00,
            'minimum_amount' => 50.00,
            'max_uses' => 50,
            'used_count' => 0,
            'is_active' => true,
        ]);

        DiscountCode::create([
            'code' => 'WELCOME25',
            'description' => '25% off for new customers',
            'discount_percentage' => 25.00,
            'minimum_amount' => 25.00,
            'max_uses' => 200,
            'used_count' => 0,
            'is_active' => true,
        ]);

        DiscountCode::create([
            'code' => 'FLASH50',
            'description' => '50% off flash sale (limited time)',
            'discount_percentage' => 50.00,
            'minimum_amount' => 100.00,
            'max_uses' => 10,
            'used_count' => 0,
            'is_active' => true,
            'valid_until' => now()->addDays(7),
        ]);

        DiscountCode::create([
            'code' => 'EXPIRED',
            'description' => 'This code has expired',
            'discount_percentage' => 15.00,
            'minimum_amount' => 0.00,
            'max_uses' => 100,
            'used_count' => 0,
            'is_active' => false,
        ]);
    }
}
