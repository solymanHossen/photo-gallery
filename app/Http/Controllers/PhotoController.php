<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Photo;
use App\Models\Tag;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = Photo::with(['user', 'category', 'tags'])
            ->when($request->user(), function ($q) use ($request) {
                return $q->where('user_id', $request->user()->id)
                    ->orWhere('is_public', true);
            }, function ($q) {
                return $q->where('is_public', true);
            });

        // Apply filters
        if ($request->filled('search')) {
            $query->search($request->search);
        }

        if ($request->filled('category')) {
            $query->byCategory($request->category);
        }

        if ($request->filled('tag')) {
            $query->byTag($request->tag);
        }

        if ($request->filled('is_featured')) {
            $query->featured();
        }

        // Apply sorting
        $sortBy = $request->input('sort_by', 'latest');
        switch ($sortBy) {
            case 'oldest':
                $query->oldest();
                break;
            case 'most_viewed':
                $query->orderByDesc('views_count');
                break;
            case 'most_liked':
                $query->orderByDesc('likes_count');
                break;
            case 'title':
                $query->orderBy('title');
                break;
            default:
                $query->latest();
        }

        $photos = $query->paginate($request->input('per_page', 12))
            ->withQueryString();

        $categories = Category::active()->ordered()->get();
        $tags = Tag::withCount('photos')->orderBy('name')->get();

        $stats = [
            'total_photos' => Photo::count(),
            'total_categories' => Category::count(),
            'total_tags' => Tag::count(),
            'total_views' => Photo::sum('views_count'),
            'total_downloads' => Photo::sum('downloads_count'),
        ];

        return Inertia::render('Gallery/Index', [
            'photos' => $photos,
            'categories' => $categories,
            'tags' => $tags,
            'filters' => $request->only(['search', 'category', 'tag', 'is_featured', 'sort_by', 'per_page']),
            'stats' => $stats,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $categories = Category::active()->ordered()->get();
        $tags = Tag::orderBy('name')->get();

        return Inertia::render('Gallery/Create', [
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:5000',
            'category_id' => 'nullable|exists:categories,id',
            'tag_ids' => 'nullable|array',
            'tag_ids.*' => 'exists:tags,id',
            'file' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'alt_text' => 'nullable|string|max:255',
            'is_public' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        $file = $request->file('file');
        $filename = Str::random(40) . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs('photos', $filename, 'public');

        // Create thumbnail
        $thumbnailPath = null;
        try {
            $thumbnailFilename = 'thumb_' . $filename;
            $thumbnailPath = 'photos/thumbnails/' . $thumbnailFilename;
            
            // Simple thumbnail creation without intervention/image
            $sourceImage = imagecreatefromstring(file_get_contents($file->getRealPath()));
            $width = imagesx($sourceImage);
            $height = imagesy($sourceImage);
            $newWidth = 400;
            $newHeight = (int)($height * ($newWidth / $width));
            
            $thumb = imagecreatetruecolor($newWidth, $newHeight);
            imagecopyresampled($thumb, $sourceImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
            
            ob_start();
            imagejpeg($thumb, null, 85);
            $thumbnailData = ob_get_clean();
            Storage::disk('public')->put($thumbnailPath, $thumbnailData);
            
            imagedestroy($sourceImage);
            imagedestroy($thumb);
        } catch (\Exception $e) {
            \Log::warning('Failed to create thumbnail: ' . $e->getMessage());
        }

        // Extract EXIF data
        $exifData = null;
        try {
            $exif = @exif_read_data($file->getRealPath());
            if ($exif) {
                $exifData = [
                    'make' => $exif['Make'] ?? null,
                    'model' => $exif['Model'] ?? null,
                    'exposureTime' => $exif['ExposureTime'] ?? null,
                    'fNumber' => $exif['FNumber'] ?? null,
                    'iso' => $exif['ISOSpeedRatings'] ?? null,
                    'dateTime' => $exif['DateTimeOriginal'] ?? null,
                    'focalLength' => $exif['FocalLength'] ?? null,
                ];
            }
        } catch (\Exception $e) {
            // Continue without EXIF data
        }

        // Get image dimensions
        $imageSize = getimagesize($file->getRealPath());

        $photo = Photo::create([
            'user_id' => Auth::id(),
            'category_id' => $validated['category_id'] ?? null,
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'file_path' => $path,
            'thumbnail_path' => $thumbnailPath,
            'original_filename' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'file_size' => $file->getSize(),
            'width' => $imageSize[0] ?? null,
            'height' => $imageSize[1] ?? null,
            'exif_data' => $exifData,
            'alt_text' => $validated['alt_text'] ?? $validated['title'],
            'is_public' => $validated['is_public'] ?? true,
            'is_featured' => $validated['is_featured'] ?? false,
        ]);

        // Attach tags
        if (!empty($validated['tag_ids'])) {
            $photo->tags()->attach($validated['tag_ids']);
        }

        return redirect()->route('photos.show', $photo)
            ->with('success', 'Photo uploaded successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Photo $photo): Response
    {
        // Check authorization
        if (!$photo->is_public && (!Auth::check() || Auth::id() !== $photo->user_id)) {
            abort(403);
        }

        $photo->load(['user', 'category', 'tags']);
        $photo->incrementViews();

        // Get related photos
        $relatedPhotos = Photo::public()
            ->with(['user', 'category'])
            ->where('id', '!=', $photo->id)
            ->when($photo->category_id, function ($q) use ($photo) {
                return $q->where('category_id', $photo->category_id);
            })
            ->latest()
            ->limit(6)
            ->get();

        return Inertia::render('Gallery/Show', [
            'photo' => $photo,
            'relatedPhotos' => $relatedPhotos,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Photo $photo): Response
    {
        // Check authorization
        if (Auth::id() !== $photo->user_id) {
            abort(403);
        }

        $photo->load('tags');
        $categories = Category::active()->ordered()->get();
        $tags = Tag::orderBy('name')->get();

        return Inertia::render('Gallery/Edit', [
            'photo' => $photo,
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Photo $photo): RedirectResponse
    {
        // Check authorization
        if (Auth::id() !== $photo->user_id) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:5000',
            'category_id' => 'nullable|exists:categories,id',
            'tag_ids' => 'nullable|array',
            'tag_ids.*' => 'exists:tags,id',
            'alt_text' => 'nullable|string|max:255',
            'is_public' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        $photo->update([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'category_id' => $validated['category_id'] ?? null,
            'alt_text' => $validated['alt_text'] ?? $validated['title'],
            'is_public' => $validated['is_public'] ?? $photo->is_public,
            'is_featured' => $validated['is_featured'] ?? $photo->is_featured,
        ]);

        // Sync tags
        if (isset($validated['tag_ids'])) {
            $photo->tags()->sync($validated['tag_ids']);
        }

        return redirect()->route('photos.show', $photo)
            ->with('success', 'Photo updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Photo $photo): RedirectResponse
    {
        // Check authorization
        if (Auth::id() !== $photo->user_id) {
            abort(403);
        }

        $photo->delete();

        return redirect()->route('photos.index')
            ->with('success', 'Photo deleted successfully!');
    }

    /**
     * Download the photo.
     */
    public function download(Photo $photo)
    {
        // Check authorization
        if (!$photo->is_public && (!Auth::check() || Auth::id() !== $photo->user_id)) {
            abort(403);
        }

        $photo->incrementDownloads();

        return Storage::disk('public')->download($photo->file_path, $photo->original_filename);
    }
}
