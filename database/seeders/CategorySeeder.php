<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Nature',
                'slug' => 'nature',
                'description' => 'Beautiful landscapes, wildlife, and natural scenery',
                'color' => '#10B981',
                'icon' => '🌿',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Architecture',
                'slug' => 'architecture',
                'description' => 'Buildings, structures, and urban design',
                'color' => '#6366F1',
                'icon' => '🏛️',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Portrait',
                'slug' => 'portrait',
                'description' => 'People photography and portraiture',
                'color' => '#EC4899',
                'icon' => '👤',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Street',
                'slug' => 'street',
                'description' => 'Urban life and street photography',
                'color' => '#F59E0B',
                'icon' => '🏙️',
                'order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Abstract',
                'slug' => 'abstract',
                'description' => 'Abstract and artistic photography',
                'color' => '#8B5CF6',
                'icon' => '🎨',
                'order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Food',
                'slug' => 'food',
                'description' => 'Culinary photography and food styling',
                'color' => '#EF4444',
                'icon' => '🍽️',
                'order' => 6,
                'is_active' => true,
            ],
            [
                'name' => 'Travel',
                'slug' => 'travel',
                'description' => 'Travel destinations and adventures',
                'color' => '#06B6D4',
                'icon' => '✈️',
                'order' => 7,
                'is_active' => true,
            ],
            [
                'name' => 'Black & White',
                'slug' => 'black-and-white',
                'description' => 'Monochrome and black and white photography',
                'color' => '#6B7280',
                'icon' => '⚫',
                'order' => 8,
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
