import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface NavItemWithAuth extends NavItem {
    auth?: 'auth' | 'guest';
    method?: 'get' | 'post' | 'put' | 'delete';
    variant?: 'primary' | 'secondary';
    align?: "left" | "right";
    onClick?: (cleanup?: () => void) => void;
}

import { CartSummary } from './cart';

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    cart: CartSummary;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles: array;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Role {
    id: number;
    name: string;
    permissions: [],
    guard_name: string;
    created_at: string;
    updated_at: string;
}


export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
  links: Link[];
}

export interface Link{
    active: boolean;
    label: string;
    url:string
}

export interface Review {
    id: number;
    rating: number;
    comment: string | null;
    created_at: string;
    user: {
        id: number;
        name: string;
    };
}

export interface Product {
    id : number;
    name: string;
    description: string;
    category: Category;
    price: number;
    average_rating?: number;
    reviews_count?: number;
    reviews?: Review[];
    is_available: boolean;
    is_published: boolean;
    image?: File;
    created_at: string;
    updated_at: string;
}

export interface Permission {
    id: number;
    name: string;
}

export interface Category {
    id: number;
    name: string;
    description: string;
    created_at:string;
    updated_at:string;
}

export interface FilterCallbacks {
    onSearchChange: (search: string) => void;
    onPriceChange?: (priceRange: [number, number]) => void;
    onAvailabilityChange?: (available: boolean, notAvailable: boolean) => void;
    onYearsChange: (years: Set<number>) => void;
    onCategoriesChange: (categories: Set<number>) => void;
}

export interface FilterData {
    categories: Category[];
    categoryCounts: Record<number, number>;
    yearCounts: Record<number, number>;
    availabilityCounts: Record<string, number>;
    years: number[];
    selectedYears: Set<number>;
    selectedCategories: Set<number>;
    priceRange: { min: number; max: number };
}

