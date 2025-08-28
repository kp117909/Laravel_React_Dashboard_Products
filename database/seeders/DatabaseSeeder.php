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
        User::factory(100)->create();
        $admin = User::factory()->create([
            'name' => 'kpolak491',
            'email' => 'kpolak491@gmail.com',
            'password' => bcrypt('test1234'),
        ]);

        $admin->assignRole('Admin');
        $this->call(CategorySeeder::class);
        $this->call(ProductSeeder::class);
        $this->call(PermissionSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(DiscountCodeSeeder::class);
        $this->call(OrderSeeder::class);
        Review::factory(100)->create();
    }
}
