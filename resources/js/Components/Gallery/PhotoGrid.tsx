import { Photo } from '@/types';
import PhotoCard from './PhotoCard';

interface PhotoGridProps {
    photos: Photo[];
    showActions?: boolean;
    onDelete?: (id: number) => void;
    emptyMessage?: string;
}

export default function PhotoGrid({
    photos,
    showActions = false,
    onDelete,
    emptyMessage = 'No photos found.',
}: PhotoGridProps) {
    if (photos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <svg
                    className="h-24 w-24 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
                <p className="mt-4 text-lg text-gray-500">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {photos.map((photo) => (
                <PhotoCard
                    key={photo.id}
                    photo={photo}
                    showActions={showActions}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
