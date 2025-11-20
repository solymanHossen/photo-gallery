import { Head, Link, router } from '@inertiajs/react';
import { PhotoShowPageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PhotoGrid from '@/Components/Gallery/PhotoGrid';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

export default function Show({ auth, photo, relatedPhotos }: PhotoShowPageProps) {
    const isOwner = auth.user && auth.user.id === photo.user_id;

    const handleDownload = () => {
        window.location.href = route('photos.download', photo.id);
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this photo?')) {
            router.delete(route('photos.destroy', photo.id));
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('photos.index')}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </Link>
                        <h2 className="text-2xl font-bold leading-tight text-gray-800">
                            {photo.title}
                        </h2>
                    </div>
                    {isOwner && (
                        <div className="flex gap-3">
                            <Link href={route('photos.edit', photo.id)}>
                                <SecondaryButton>Edit</SecondaryButton>
                            </Link>
                            <DangerButton onClick={handleDelete}>Delete</DangerButton>
                        </div>
                    )}
                </div>
            }
        >
            <Head title={photo.title} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Main Photo */}
                        <div className="lg:col-span-2">
                            <div className="overflow-hidden rounded-lg bg-white shadow-lg">
                                <img
                                    src={photo.file_url}
                                    alt={photo.alt_text || photo.title}
                                    className="w-full"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-4 flex gap-3">
                                <PrimaryButton onClick={handleDownload} className="flex-1">
                                    <svg
                                        className="-ml-1 mr-2 h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                        />
                                    </svg>
                                    Download
                                </PrimaryButton>
                                <button className="rounded-lg border-2 border-gray-300 bg-white px-6 py-2 text-gray-700 hover:bg-gray-50">
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Photo Details */}
                        <div className="lg:col-span-1">
                            <div className="rounded-lg bg-white p-6 shadow">
                                <h3 className="text-lg font-semibold text-gray-900">Details</h3>

                                <dl className="mt-4 space-y-4">
                                    {/* Description */}
                                    {photo.description && (
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Description
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {photo.description}
                                            </dd>
                                        </div>
                                    )}

                                    {/* Uploaded by */}
                                    {photo.user && (
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Uploaded by
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {photo.user.name}
                                            </dd>
                                        </div>
                                    )}

                                    {/* Category */}
                                    {photo.category && (
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Category
                                            </dt>
                                            <dd className="mt-1">
                                                <Link
                                                    href={route('categories.show', photo.category.id)}
                                                    className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-white"
                                                    style={{ backgroundColor: photo.category.color }}
                                                >
                                                    {photo.category.name}
                                                </Link>
                                            </dd>
                                        </div>
                                    )}

                                    {/* Tags */}
                                    {photo.tags && photo.tags.length > 0 && (
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Tags
                                            </dt>
                                            <dd className="mt-2 flex flex-wrap gap-2">
                                                {photo.tags.map((tag) => (
                                                    <Link
                                                        key={tag.id}
                                                        href={route('tags.show', tag.id)}
                                                        className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-white"
                                                        style={{ backgroundColor: tag.color }}
                                                    >
                                                        {tag.name}
                                                    </Link>
                                                ))}
                                            </dd>
                                        </div>
                                    )}

                                    {/* Dimensions */}
                                    {photo.width && photo.height && (
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Dimensions
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {photo.width} × {photo.height} px
                                            </dd>
                                        </div>
                                    )}

                                    {/* File Size */}
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            File Size
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {formatFileSize(photo.file_size)}
                                        </dd>
                                    </div>

                                    {/* Upload Date */}
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Uploaded
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {formatDate(photo.created_at)}
                                        </dd>
                                    </div>

                                    {/* Stats */}
                                    <div className="border-t pt-4">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Statistics
                                        </dt>
                                        <dd className="mt-2 grid grid-cols-3 gap-4 text-center">
                                            <div>
                                                <div className="text-2xl font-bold text-gray-900">
                                                    {photo.views_count}
                                                </div>
                                                <div className="text-xs text-gray-500">Views</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-gray-900">
                                                    {photo.likes_count}
                                                </div>
                                                <div className="text-xs text-gray-500">Likes</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-gray-900">
                                                    {photo.downloads_count}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Downloads
                                                </div>
                                            </div>
                                        </dd>
                                    </div>

                                    {/* Camera Info (EXIF) */}
                                    {photo.exif_data && (
                                        <div className="border-t pt-4">
                                            <dt className="text-sm font-medium text-gray-500">
                                                Camera Info
                                            </dt>
                                            <dd className="mt-2 space-y-1 text-sm text-gray-900">
                                                {photo.exif_data.make && photo.exif_data.model && (
                                                    <div>
                                                        {photo.exif_data.make} {photo.exif_data.model}
                                                    </div>
                                                )}
                                                {photo.exif_data.focalLength && (
                                                    <div>Focal Length: {photo.exif_data.focalLength}</div>
                                                )}
                                                {photo.exif_data.aperture && (
                                                    <div>Aperture: f/{photo.exif_data.aperture}</div>
                                                )}
                                                {photo.exif_data.iso && (
                                                    <div>ISO: {photo.exif_data.iso}</div>
                                                )}
                                                {photo.exif_data.exposureTime && (
                                                    <div>
                                                        Shutter: {photo.exif_data.exposureTime}s
                                                    </div>
                                                )}
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>
                        </div>
                    </div>

                    {/* Related Photos */}
                    {relatedPhotos && relatedPhotos.length > 0 && (
                        <div className="mt-12">
                            <h3 className="mb-6 text-2xl font-bold text-gray-900">
                                Related Photos
                            </h3>
                            <PhotoGrid photos={relatedPhotos} />
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
