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
                'name' => 'Guitar',
                'description' => 'Acoustic guitar for beginners',
                'price' => 350.00,
                'average_rating' => 4.5,
                'reviews_count' => 10,
                'is_available' => true,
                'image' => 'products/guitar.png',
            ],
            [
                'name' => 'Piano',
                'description' => '88-key digital piano',
                'price' => 1200.00,
                'average_rating' => 4.8,
                'reviews_count' => 25,
                'is_available' => true,
                'image' => 'products/piano.png',
            ],
            [
                'name' => 'Drum Set',
                'description' => '5-piece drum set for professionals',
                'price' => 900.00,
                'average_rating' => 4.2,
                'reviews_count' => 7,
                'is_available' => false,
                'image' => 'products/drumset.png',
            ],
        ];

        foreach ($productsData as $data) {
            $category = $categories->random();

            $product = Product::create([
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

        Category::factory(5)->create();

        Product::factory(20)->create();

    }
}
