<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Fiction',
                'description' => 'Novels, short stories, and literary fiction.',
            ],
            [
                'name' => 'Non-Fiction',
                'description' => 'Biographies, essays, and real-world topics.',
            ],
            [
                'name' => 'Science & Technology',
                'description' => 'E-books on scientific topics, programming, and innovation.',
            ],
            [
                'name' => 'Self-Help',
                'description' => 'Personal development, productivity, and mental health guides.',
            ],
            [
                'name' => 'Business & Economics',
                'description' => 'Entrepreneurship, investing, marketing, and economics.',
            ],
            [
                'name' => 'Education',
                'description' => 'Textbooks, teaching materials, and academic guides.',
            ],
            [
                'name' => 'Children & Young Adult',
                'description' => 'Books for kids and teens, including illustrated stories.',
            ],
            [
                'name' => 'Fantasy & Sci-Fi',
                'description' => 'Science fiction, fantasy worlds, and speculative fiction.',
            ],
            [
                'name' => 'Romance',
                'description' => 'Romantic novels and emotional dramas.',
            ],
            [
                'name' => 'Mystery & Thriller',
                'description' => 'Detective stories, thrillers, and suspense fiction.',
            ],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['name' => $category['name']], // Search by name
                $category // Create with all data if not found
            );
        }
    }
}
