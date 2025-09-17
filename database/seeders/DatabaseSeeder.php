<?php

namespace Database\Seeders;

use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Only create users if none exist
        if (User::count() == 0) {
            User::factory(100)->create();
        }

        $this->call(PermissionSeeder::class);
        $this->call(RoleSeeder::class);

        // Create admin user only if it doesn't exist
        $admin = User::firstOrCreate(
            ['email' => 'kpolak491@gmail.com'],
            [
                'name' => 'kpolak491',
                'password' => bcrypt('test1234'),
            ]
        );

        // Assign admin role only if user doesn't have it
        if (!$admin->hasRole('admin')) {
            $admin->assignRole('admin');
        }

        $this->call(CategorySeeder::class);
        $this->call(ProductSeeder::class);
        $this->call(DiscountCodeSeeder::class);
        $this->call(OrderSeeder::class);
        
        // Only create reviews if none exist
        if (Review::count() == 0) {
            Review::factory(100)->create();
        }
    }
}
