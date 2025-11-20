import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { GalleryIndexPageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PhotoGrid from '@/Components/Gallery/PhotoGrid';
import SearchBar from '@/Components/Gallery/SearchBar';
import FilterPanel from '@/Components/Gallery/FilterPanel';
import Pagination from '@/Components/Gallery/Pagination';
import PhotoUploadModal from '@/Components/Gallery/PhotoUploadModal';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({
    auth,
    photos,
    categories,
    tags,
    filters,
    stats,
}: GalleryIndexPageProps) {
    const [showUploadModal, setShowUploadModal] = useState(false);

    const handleSearch = (query: string) => {
        router.get(
            route('photos.index'),
            { ...filters, search: query },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleFilterChange = (newFilters: Partial<typeof filters>) => {
        router.get(
            route('photos.index'),
            { ...filters, ...newFilters },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this photo?')) {
            router.delete(route('photos.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold leading-tight text-gray-800">
                            Photo Gallery
                        </h2>
                        {stats && (
                            <div className="mt-2 flex gap-6 text-sm text-gray-600">
                                <span>{stats.total_photos} Photos</span>
                                <span>{stats.total_categories} Categories</span>
                                <span>{stats.total_tags} Tags</span>
                                <span>{stats.total_views.toLocaleString()} Views</span>
                            </div>
                        )}
                    </div>
                    {auth.user && (
                        <PrimaryButton onClick={() => setShowUploadModal(true)}>
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
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            Upload Photo
                        </PrimaryButton>
                    )}
                </div>
            }
        >
            <Head title="Gallery" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Search Bar */}
                    <div className="mb-6">
                        <SearchBar
                            initialValue={filters.search || ''}
                            onSearch={handleSearch}
                            placeholder="Search photos by title, description, or alt text..."
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                        {/* Filters Sidebar */}
                        <div className="lg:col-span-1">
                            <FilterPanel
                                categories={categories}
                                tags={tags}
                                filters={filters}
                                onFilterChange={handleFilterChange}
                            />
                        </div>

                        {/* Photos Grid */}
                        <div className="lg:col-span-3">
                            <PhotoGrid
                                photos={photos.data}
                                showActions={!!auth.user}
                                onDelete={handleDelete}
                                emptyMessage="No photos found. Try adjusting your filters or upload a new photo!"
                            />

                            {/* Pagination */}
                            {photos.data.length > 0 && (
                                <div className="mt-8">
                                    <Pagination data={photos} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Upload Modal */}
            {auth.user && (
                <PhotoUploadModal
                    show={showUploadModal}
                    onClose={() => setShowUploadModal(false)}
                    categories={categories}
                    tags={tags}
                />
            )}
        </AuthenticatedLayout>
    );
}
