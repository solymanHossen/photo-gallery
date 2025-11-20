import { useState, useRef, FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { Category, Tag } from '@/types';
import Modal from '../Modal';
import InputLabel from '../InputLabel';
import TextInput from '../TextInput';
import InputError from '../InputError';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';

interface PhotoUploadModalProps {
    show: boolean;
    onClose: () => void;
    categories: Category[];
    tags: Tag[];
}

export default function PhotoUploadModal({
    show,
    onClose,
    categories,
    tags,
}: PhotoUploadModalProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        category_id: undefined as number | undefined,
        tag_ids: [] as number[],
        file: undefined as File | undefined,
        alt_text: '',
        is_public: true,
        is_featured: false,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('file', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            // Auto-fill title from filename if empty
            if (!data.title) {
                const filename = file.name.replace(/\.[^/.]+$/, '');
                setData('title', filename);
            }
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('photos.store'), {
            onSuccess: () => {
                reset();
                setPreview(null);
                onClose();
            },
        });
    };

    const handleTagToggle = (tagId: number) => {
        const currentTags = data.tag_ids || [];
        if (currentTags.includes(tagId)) {
            setData('tag_ids', currentTags.filter((id) => id !== tagId));
        } else {
            setData('tag_ids', [...currentTags, tagId]);
        }
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="2xl">
            <form onSubmit={handleSubmit} className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900">Upload Photo</h2>

                <div className="mt-6 space-y-6">
                    {/* File Upload */}
                    <div>
                        <InputLabel htmlFor="file" value="Photo" />
                        <div className="mt-2">
                            {preview ? (
                                <div className="relative">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="h-64 w-full rounded-lg object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPreview(null);
                                            setData('file', undefined);
                                            if (fileInputRef.current) {
                                                fileInputRef.current.value = '';
                                            }
                                        }}
                                        className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white shadow-lg hover:bg-red-700"
                                    >
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-12 transition-colors hover:border-gray-400">
                                    <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <p className="mt-2 text-sm text-gray-600">
                                        Click to upload or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>
                        <InputError message={errors.file} className="mt-2" />
                    </div>

                    {/* Title */}
                    <div>
                        <InputLabel htmlFor="title" value="Title" />
                        <TextInput
                            id="title"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    {/* Description */}
                    <div>
                        <InputLabel htmlFor="description" value="Description" />
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            rows={3}
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    {/* Category */}
                    <div>
                        <InputLabel htmlFor="category_id" value="Category" />
                        <select
                            id="category_id"
                            value={data.category_id || ''}
                            onChange={(e) => setData('category_id', e.target.value ? Number(e.target.value) : undefined)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.category_id} className="mt-2" />
                    </div>

                    {/* Tags */}
                    <div>
                        <InputLabel value="Tags" />
                        <div className="mt-2 flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <button
                                    key={tag.id}
                                    type="button"
                                    onClick={() => handleTagToggle(tag.id)}
                                    className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
                                        data.tag_ids?.includes(tag.id)
                                            ? 'text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                    style={
                                        data.tag_ids?.includes(tag.id)
                                            ? { backgroundColor: tag.color }
                                            : undefined
                                    }
                                >
                                    {tag.name}
                                </button>
                            ))}
                        </div>
                        <InputError message={errors.tag_ids} className="mt-2" />
                    </div>

                    {/* Alt Text */}
                    <div>
                        <InputLabel htmlFor="alt_text" value="Alt Text (for accessibility)" />
                        <TextInput
                            id="alt_text"
                            type="text"
                            value={data.alt_text}
                            onChange={(e) => setData('alt_text', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.alt_text} className="mt-2" />
                    </div>

                    {/* Visibility Options */}
                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={data.is_public}
                                onChange={(e) => setData('is_public', e.target.checked)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">Public</span>
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={data.is_featured}
                                onChange={(e) => setData('is_featured', e.target.checked)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">Featured</span>
                        </label>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-3">
                    <SecondaryButton onClick={onClose} type="button">
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton disabled={processing || !data.file}>
                        {processing ? 'Uploading...' : 'Upload Photo'}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
