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
        if (User::count() == 0) {
            User::factory(100)->create();
        }

        $this->call(PermissionSeeder::class);
        $this->call(RoleSeeder::class);


        $admin = User::firstOrCreate(
            ['email' => 'kpolak491@gmail.com'],
            [
                'name' => 'kpolak491',
                'password' => bcrypt('test1234'),
            ]
        );


        if (!$admin->hasRole('admin')) {
            $admin->assignRole('admin');
        }


        $admin_moderator = User::firstOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'admin',
                'password' => bcrypt('admin1234'),
            ]
        );


        if (!$admin_moderator->hasRole('moderator')) {
            $admin_moderator->assignRole('moderator');
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
