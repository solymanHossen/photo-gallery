import { Category, Tag, PhotoFilters as Filters } from '@/types';
import { router } from '@inertiajs/react';

interface FilterPanelProps {
    categories: Category[];
    tags: Tag[];
    filters: Filters;
    onFilterChange: (filters: Partial<Filters>) => void;
}

export default function FilterPanel({
    categories,
    tags,
    filters,
    onFilterChange,
}: FilterPanelProps) {
    const handleCategoryChange = (categoryId: string) => {
        onFilterChange({ category: categoryId || undefined });
    };

    const handleTagChange = (tagId: string) => {
        onFilterChange({ tag: tagId || undefined });
    };

    const handleSortChange = (sortBy: string) => {
        onFilterChange({ sort_by: sortBy as Filters['sort_by'] });
    };

    const handleFeaturedToggle = () => {
        onFilterChange({ is_featured: !filters.is_featured });
    };

    const handleReset = () => {
        router.get(route('photos.index'), {}, { preserveState: true });
    };

    const hasActiveFilters =
        filters.category || filters.tag || filters.is_featured || filters.sort_by !== 'latest';

    return (
        <div className="space-y-6 rounded-lg bg-white p-6 shadow">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                {hasActiveFilters && (
                    <button
                        onClick={handleReset}
                        className="text-sm text-blue-600 hover:text-blue-800"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {/* Category Filter */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Category
                </label>
                <select
                    value={filters.category || ''}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name} ({category.photos_count || 0})
                        </option>
                    ))}
                </select>
            </div>

            {/* Tag Filter */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Tag
                </label>
                <select
                    value={filters.tag || ''}
                    onChange={(e) => handleTagChange(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="">All Tags</option>
                    {tags.map((tag) => (
                        <option key={tag.id} value={tag.id}>
                            {tag.name} ({tag.photos_count || 0})
                        </option>
                    ))}
                </select>
            </div>

            {/* Sort By */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Sort By
                </label>
                <select
                    value={filters.sort_by || 'latest'}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                    <option value="most_viewed">Most Viewed</option>
                    <option value="most_liked">Most Liked</option>
                    <option value="title">Title (A-Z)</option>
                </select>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                    Featured Only
                </label>
                <button
                    type="button"
                    onClick={handleFeaturedToggle}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        filters.is_featured ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            filters.is_featured ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                </button>
            </div>

            {/* Quick Tag Filters */}
            {tags.length > 0 && (
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Quick Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {tags.slice(0, 10).map((tag) => (
                            <button
                                key={tag.id}
                                onClick={() =>
                                    handleTagChange(
                                        filters.tag === String(tag.id) ? '' : String(tag.id)
                                    )
                                }
                                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                                    filters.tag === String(tag.id)
                                        ? 'text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                                style={
                                    filters.tag === String(tag.id)
                                        ? { backgroundColor: tag.color }
                                        : undefined
                                }
                            >
                                {tag.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Category Filters */}
            {categories.length > 0 && (
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Quick Categories
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() =>
                                    handleCategoryChange(
                                        filters.category === String(category.id)
                                            ? ''
                                            : String(category.id)
                                    )
                                }
                                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                                    filters.category === String(category.id)
                                        ? 'text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                                style={
                                    filters.category === String(category.id)
                                        ? { backgroundColor: category.color }
                                        : undefined
                                }
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
