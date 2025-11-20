import { Config } from 'ziggy-js';

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User;
  };
  ziggy?: Config;
  flash?: {
    message?: string;
    error?: string;
    success?: string;
    warning?: string;
  };
  errors?: Record<string, string>;
};

/* User Model Types */
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

/* Gallery Model Types */
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon?: string;
  order: number;
  is_active: boolean;
  photos_count?: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color: string;
  photos_count?: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ExifData {
  make?: string;
  model?: string;
  lens?: string;
  focalLength?: string;
  aperture?: string;
  shutterSpeed?: string;
  iso?: number;
  exposureTime?: string;
  flash?: string;
  whiteBalance?: string;
  dateTime?: string;
  gps?: {
    latitude?: number;
    longitude?: number;
    altitude?: number;
  };
  [key: string]: any;
}

export interface Photo {
  id: number;
  user_id: number;
  category_id?: number;
  title: string;
  slug: string;
  description?: string;
  file_path: string;
  thumbnail_path?: string;
  file_url: string;
  thumbnail_url: string;
  original_filename: string;
  mime_type: string;
  file_size: number;
  width?: number;
  height?: number;
  exif_data?: ExifData;
  alt_text?: string;
  camera_model?: string;
  lens?: string;
  focal_length?: string;
  aperture?: string;
  shutter_speed?: string;
  iso?: number;
  taken_at?: string;
  location?: string;
  is_public: boolean;
  is_featured: boolean;
  views_count: number;
  downloads_count: number;
  likes_count: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  user?: User;
  category?: Category;
  tags?: Tag[];
}

/* Gallery Filter & Search Types */
export interface PhotoFilters {
  search?: string;
  category?: number | string;
  tag?: number | string;
  user?: number | string;
  is_featured?: boolean;
  sort_by?: 'latest' | 'oldest' | 'most_viewed' | 'most_liked' | 'title';
  per_page?: number;
}

export interface GalleryStats {
  total_photos: number;
  total_categories: number;
  total_tags: number;
  total_views: number;
  total_downloads: number;
  storage_used: number;
}


/* Pagination Types */
export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginatedData<T> {
  data: T[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

/* Global Inertia Page Props - Keeping for backward compatibility */
export interface PageProps {
  auth: {
    user: User;
  };
  ziggy?: Config;
  flash?: {
    message?: string;
    error?: string;
    success?: string;
    warning?: string;
  };
  errors?: Record<string, string>;
}

/* Common Component Props */
export interface ClassNameProps {
  className?: string;
}

export interface ChildrenProps {
  children: React.ReactNode;
}

/* Form Input Types */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  isFocused?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

/* Button Types */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

/* Link Types */
export interface LinkProps {
  href: string;
  active?: boolean;
  className?: string;
  children: React.ReactNode;
}

/* Modal Types */
export interface ModalProps {
  show?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  closeable?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/* Dropdown Types */
export interface DropdownProps {
  children: React.ReactNode;
}

export interface DropdownTriggerProps {
  children: React.ReactNode;
}

export interface DropdownContentProps {
  align?: 'left' | 'right';
  width?: '48' | '60';
  contentClasses?: string;
  children: React.ReactNode;
}

export interface DropdownLinkProps {
  href: string;
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
  as?: 'a' | 'button';
  children: React.ReactNode;
}

/* Auth Page Props */
export interface AuthPageProps extends PageProps {
  status?: string;
}

export interface LoginPageProps extends AuthPageProps {
  canResetPassword: boolean;
}

export interface ResetPasswordPageProps extends AuthPageProps {
  token: string;
  email: string;
}

export interface ProfileEditPageProps extends PageProps {
  mustVerifyEmail: boolean;
  status?: string;
}

/* Gallery Page Props */
export interface GalleryIndexPageProps extends PageProps {
  photos: PaginatedData<Photo>;
  categories: Category[];
  tags: Tag[];
  filters: PhotoFilters;
  stats?: GalleryStats;
}

export interface PhotoShowPageProps extends PageProps {
  photo: Photo;
  relatedPhotos?: Photo[];
}

export interface PhotoCreatePageProps extends PageProps {
  categories: Category[];
  tags: Tag[];
}

export interface PhotoEditPageProps extends PageProps {
  photo: Photo;
  categories: Category[];
  tags: Tag[];
}

export interface CategoryIndexPageProps extends PageProps {
  categories: PaginatedData<Category>;
}

export interface CategoryShowPageProps extends PageProps {
  category: Category;
  photos: PaginatedData<Photo>;
}

export interface TagIndexPageProps extends PageProps {
  tags: PaginatedData<Tag>;
}

export interface TagShowPageProps extends PageProps {
  tag: Tag;
  photos: PaginatedData<Photo>;
}

export interface DashboardPageProps extends PageProps {
  stats: GalleryStats;
  recentPhotos: Photo[];
  featuredPhotos: Photo[];
}

/* Form Data Types */
export interface PhotoFormData {
  title: string;
  description?: string;
  category_id?: number;
  tag_ids?: number[];
  file?: File;
  alt_text?: string;
  is_public: boolean;
  is_featured: boolean;
}

export interface CategoryFormData {
  name: string;
  description?: string;
  color: string;
  icon?: string;
  order: number;
  is_active: boolean;
}

export interface TagFormData {
  name: string;
  description?: string;
  color: string;
}

/* Upload Progress Types */
export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface UploadState {
  isUploading: boolean;
  progress: UploadProgress;
  error?: string;
}
