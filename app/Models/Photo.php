<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Photo extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'slug',
        'description',
        'file_path',
        'thumbnail_path',
        'original_filename',
        'mime_type',
        'file_size',
        'width',
        'height',
        'exif_data',
        'alt_text',
        'camera_model',
        'lens',
        'focal_length',
        'aperture',
        'shutter_speed',
        'iso',
        'taken_at',
        'latitude',
        'longitude',
        'is_public',
        'is_featured',
        'views_count',
        'downloads_count',
        'likes_count',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'exif_data' => 'array',
        'taken_at' => 'datetime',
        'is_public' => 'boolean',
        'is_featured' => 'boolean',
        'views_count' => 'integer',
        'downloads_count' => 'integer',
        'likes_count' => 'integer',
        'file_size' => 'integer',
        'width' => 'integer',
        'height' => 'integer',
        'iso' => 'integer',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'file_url',
        'thumbnail_url',
    ];

    /**
     * Boot the model.
     */
    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($photo) {
            if (empty($photo->slug)) {
                $photo->slug = Str::slug($photo->title) . '-' . Str::random(6);
            }
        });

        static::deleting(function ($photo) {
            // Delete associated files when photo is deleted
            if ($photo->file_path && Storage::disk('public')->exists($photo->file_path)) {
                Storage::disk('public')->delete($photo->file_path);
            }
            if ($photo->thumbnail_path && Storage::disk('public')->exists($photo->thumbnail_path)) {
                Storage::disk('public')->delete($photo->thumbnail_path);
            }
        });
    }

    /**
     * Get the user that owns the photo.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the category that owns the photo.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the tags for the photo.
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class)
            ->withTimestamps();
    }

    /**
     * Get the file URL accessor.
     */
    public function getFileUrlAttribute(): string
    {
        return Storage::disk('public')->url($this->file_path);
    }

    /**
     * Get the thumbnail URL accessor.
     */
    public function getThumbnailUrlAttribute(): ?string
    {
        return $this->thumbnail_path 
            ? Storage::disk('public')->url($this->thumbnail_path)
            : $this->file_url;
    }

    /**
     * Scope a query to only include public photos.
     */
    public function scopePublic($query)
    {
        return $query->where('is_public', true);
    }

    /**
     * Scope a query to only include featured photos.
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope a query to search photos by title or description.
     */
    public function scopeSearch($query, string $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%")
              ->orWhere('alt_text', 'like', "%{$search}%");
        });
    }

    /**
     * Scope a query to filter by category.
     */
    public function scopeByCategory($query, int $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    /**
     * Scope a query to filter by tag.
     */
    public function scopeByTag($query, int $tagId)
    {
        return $query->whereHas('tags', function ($q) use ($tagId) {
            $q->where('tags.id', $tagId);
        });
    }

    /**
     * Increment the views count.
     */
    public function incrementViews(): void
    {
        $this->increment('views_count');
    }

    /**
     * Increment the downloads count.
     */
    public function incrementDownloads(): void
    {
        $this->increment('downloads_count');
    }
}
