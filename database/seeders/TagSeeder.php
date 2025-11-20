<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            ['name' => 'Sunset', 'slug' => 'sunset', 'color' => '#F59E0B', 'description' => 'Beautiful sunset moments'],
            ['name' => 'Urban', 'slug' => 'urban', 'color' => '#6B7280', 'description' => 'City and urban environments'],
            ['name' => 'Vintage', 'slug' => 'vintage', 'color' => '#92400E', 'description' => 'Classic and vintage style'],
            ['name' => 'Minimalist', 'slug' => 'minimalist', 'color' => '#000000', 'description' => 'Simple and clean compositions'],
            ['name' => 'Colorful', 'slug' => 'colorful', 'color' => '#EC4899', 'description' => 'Vibrant and colorful images'],
            ['name' => 'Outdoor', 'slug' => 'outdoor', 'color' => '#10B981', 'description' => 'Outdoor and nature photography'],
            ['name' => 'Indoor', 'slug' => 'indoor', 'color' => '#8B5CF6', 'description' => 'Interior and indoor shots'],
            ['name' => 'Macro', 'slug' => 'macro', 'color' => '#06B6D4', 'description' => 'Close-up and macro photography'],
            ['name' => 'Panorama', 'slug' => 'panorama', 'color' => '#3B82F6', 'description' => 'Wide angle and panoramic views'],
            ['name' => 'Night', 'slug' => 'night', 'color' => '#1F2937', 'description' => 'Night photography'],
            ['name' => 'Wildlife', 'slug' => 'wildlife', 'color' => '#059669', 'description' => 'Animals and wildlife'],
            ['name' => 'Cityscape', 'slug' => 'cityscape', 'color' => '#7C3AED', 'description' => 'City skylines and views'],
            ['name' => 'Beach', 'slug' => 'beach', 'color' => '#0EA5E9', 'description' => 'Coastal and beach photography'],
            ['name' => 'Mountain', 'slug' => 'mountain', 'color' => '#64748B', 'description' => 'Mountain landscapes'],
            ['name' => 'Forest', 'slug' => 'forest', 'color' => '#15803D', 'description' => 'Forest and woodland scenes'],
        ];

        foreach ($tags as $tag) {
            Tag::create($tag);
        }
    }
}
