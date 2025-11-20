import { PaginatedData } from '@/types';
import { Link } from '@inertiajs/react';

interface PaginationProps<T> {
    data: PaginatedData<T>;
    className?: string;
}

export default function Pagination<T>({ data, className = '' }: PaginationProps<T>) {
    if (data.last_page <= 1) return null;

    return (
        <div className={`flex items-center justify-between ${className}`}>
            {/* Info */}
            <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{data.from}</span> to{' '}
                <span className="font-medium">{data.to}</span> of{' '}
                <span className="font-medium">{data.total}</span> results
            </div>

            {/* Pagination Links */}
            <div className="flex items-center gap-1">
                {data.links.map((link, index) => {
                    // Skip first and last (prev/next arrows)
                    if (index === 0 || index === data.links.length - 1) {
                        return null;
                    }

                    if (link.url === null) {
                        return (
                            <span
                                key={index}
                                className="px-3 py-2 text-gray-400"
                            >
                                ...
                            </span>
                        );
                    }

                    return (
                        <Link
                            key={index}
                            href={link.url}
                            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                link.active
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                            preserveState
                            preserveScroll
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>

            {/* Prev/Next Buttons */}
            <div className="flex gap-2">
                {data.prev_page_url && (
                    <Link
                        href={data.prev_page_url}
                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        preserveState
                        preserveScroll
                    >
                        Previous
                    </Link>
                )}
                {data.next_page_url && (
                    <Link
                        href={data.next_page_url}
                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        preserveState
                        preserveScroll
                    >
                        Next
                    </Link>
                )}
            </div>
        </div>
    );
}
