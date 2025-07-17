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

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
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

export interface Product {
    id : number;
    name: string;
    description: string;
    type: string;
    price: number;
    avarage_rating?: number;
    reviews_count?: number;
    is_available?: boolean;
    image?: string;
    created_at: string;
    updated_at: string;
}

export interface Permission {
    id: number;
    name: string;
}

