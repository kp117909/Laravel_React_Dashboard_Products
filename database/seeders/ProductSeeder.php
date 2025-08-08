<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    public function run()
    {

        $categories = Category::all();

        if ($categories->isEmpty()) {
            $this->command->info('No categories found, seeder stopped.');
            return;
        }

        $productsData = [
            [
                'name' => 'The Psychology of Success',
                'description' => 'Unlock your mind with this motivational classic.',
                'price' => 29.99,
                'average_rating' => 4.7,
                'reviews_count' => 135,
                'is_available' => true,
                'image' => 'products/psychology_success.png',
            ],
            [
                'name' => 'Learn JavaScript in 24 Hours',
                'description' => 'A practical guide for beginners to modern JavaScript.',
                'price' => 19.50,
                'average_rating' => 4.3,
                'reviews_count' => 78,
                'is_available' => true,
                'image' => 'products/javascript_24h.png',
            ],
            [
                'name' => 'Digital Marketing Mastery',
                'description' => 'Grow your online business with effective strategies.',
                'price' => 39.00,
                'average_rating' => 4.6,
                'reviews_count' => 110,
                'is_available' => true,
                'image' => 'products/digital_marketing.png',
            ],
            [
                'name' => 'Fantasy Realms: The Awakening',
                'description' => 'Dive into an epic fantasy adventure.',
                'price' => 14.99,
                'average_rating' => 4.1,
                'reviews_count' => 210,
                'is_available' => false,
                'image' => 'products/fantasy_realms.png',
            ],
            [
                'name' => 'Healthy Eating on a Budget',
                'description' => 'Nutritious meal plans without breaking the bank.',
                'price' => 9.99,
                'average_rating' => 4.0,
                'reviews_count' => 62,
                'is_available' => true,
                'image' => 'products/healthy_eating.png',
            ],
            [
                'name' => 'The Art of Focus',
                'description' => 'Train your brain to fight distractions and achieve more.',
                'price' => 22.00,
                'average_rating' => 4.5,
                'reviews_count' => 89,
                'is_available' => true,
                'image' => 'products/art_of_focus.png',
            ],
            [
                'name' => 'CSS Secrets',
                'description' => 'Design stunning web interfaces with modern CSS techniques.',
                'price' => 27.50,
                'average_rating' => 4.9,
                'reviews_count' => 150,
                'is_available' => true,
                'image' => 'products/css_secrets.png',
            ],
            [
                'name' => 'AI for Beginners',
                'description' => 'A simplified guide to artificial intelligence.',
                'price' => 32.00,
                'average_rating' => 4.4,
                'reviews_count' => 72,
                'is_available' => false,
                'image' => 'products/ai_beginners.png',
            ],
            [
                'name' => 'Productivity Hacks for Remote Workers',
                'description' => 'Maximize your time working from home.',
                'price' => 15.99,
                'average_rating' => 4.2,
                'reviews_count' => 58,
                'is_available' => true,
                'image' => 'products/remote_work.png',
            ],
            [
                'name' => 'Children’s Bedtime Stories',
                'description' => 'A collection of magical tales for peaceful nights.',
                'price' => 11.50,
                'average_rating' => 4.8,
                'reviews_count' => 94,
                'is_available' => true,
                'image' => 'products/bedtime_stories.png',
            ],
        ];


        foreach ($productsData as $data) {
            $category = $categories->random();

            Product::create([
                'name' => $data['name'],
                'description' => $data['description'],
                'price' => $data['price'],
                'average_rating' => $data['average_rating'],
                'reviews_count' => $data['reviews_count'],
                'is_available' => $data['is_available'],
                'image' => null,
                'category_id' => $category->id,
            ]);
        }
        Product::factory(20)->create();

    }
}
