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
