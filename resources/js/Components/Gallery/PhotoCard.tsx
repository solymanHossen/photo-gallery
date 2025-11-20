import { Link } from '@inertiajs/react';
import { Photo } from '@/types';

interface PhotoCardProps {
    photo: Photo;
    showActions?: boolean;
    onDelete?: (id: number) => void;
}

export default function PhotoCard({ photo, showActions = false, onDelete }: PhotoCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-xl">
            <Link href={route('photos.show', photo.id)} className="block">
                <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                        src={photo.thumbnail_url}
                        alt={photo.alt_text || photo.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                    />
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="truncate text-lg font-semibold">{photo.title}</h3>
                        {photo.description && (
                            <p className="mt-1 line-clamp-2 text-sm text-gray-200">
                                {photo.description}
                            </p>
                        )}
                        
                        <div className="mt-3 flex items-center gap-4 text-xs">
                            {photo.views_count > 0 && (
                                <span className="flex items-center gap-1">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    {photo.views_count}
                                </span>
                            )}
                            {photo.likes_count > 0 && (
                                <span className="flex items-center gap-1">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    {photo.likes_count}
                                </span>
                            )}
                            {photo.downloads_count > 0 && (
                                <span className="flex items-center gap-1">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    {photo.downloads_count}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>

            {/* Top badges */}
            <div className="absolute left-2 top-2 flex gap-2">
                {photo.is_featured && (
                    <span className="rounded-full bg-yellow-500 px-2 py-1 text-xs font-semibold text-white">
                        Featured
                    </span>
                )}
                {!photo.is_public && (
                    <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                        Private
                    </span>
                )}
            </div>

            {/* Category badge */}
            {photo.category && (
                <div className="absolute right-2 top-2">
                    <Link
                        href={route('categories.show', photo.category.id)}
                        className="rounded-full px-3 py-1 text-xs font-medium text-white shadow-lg transition-transform hover:scale-105"
                        style={{ backgroundColor: photo.category.color }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {photo.category.name}
                    </Link>
                </div>
            )}

            {/* Tags */}
            {photo.tags && photo.tags.length > 0 && (
                <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1">
                    {photo.tags.slice(0, 3).map((tag) => (
                        <Link
                            key={tag.id}
                            href={route('tags.show', tag.id)}
                            className="rounded-full px-2 py-0.5 text-xs font-medium text-white opacity-0 shadow transition-all group-hover:opacity-100"
                            style={{ backgroundColor: tag.color }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {tag.name}
                        </Link>
                    ))}
                    {photo.tags.length > 3 && (
                        <span className="rounded-full bg-gray-800 px-2 py-0.5 text-xs font-medium text-white opacity-0 transition-all group-hover:opacity-100">
                            +{photo.tags.length - 3}
                        </span>
                    )}
                </div>
            )}

            {/* Action buttons */}
            {showActions && (
                <div className="absolute right-2 top-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Link
                        href={route('photos.edit', photo.id)}
                        className="rounded-full bg-blue-600 p-2 text-white shadow-lg transition-transform hover:scale-110"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </Link>
                    {onDelete && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (confirm('Are you sure you want to delete this photo?')) {
                                    onDelete(photo.id);
                                }
                            }}
                            className="rounded-full bg-red-600 p-2 text-white shadow-lg transition-transform hover:scale-110"
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
