// Simple filter persistence for shop navigation
const SHOP_FILTERS_KEY = 'shop_filters';

export interface ShopFilters {
  years: number[];
  categories: number[];
  search?: string;
  price_min?: number;
  price_max?: number;
  available?: boolean;
  not_available?: boolean;
  page?: number; // Add page number to saved filters
}

// Save filters to localStorage
export function saveShopFilters(filters: ShopFilters): void {
  try {
    localStorage.setItem(SHOP_FILTERS_KEY, JSON.stringify(filters));
  } catch (error) {
    console.warn('Failed to save filters:', error);
  }
}

// Load filters from localStorage
export function loadShopFilters(): ShopFilters | null {
  try {
    const saved = localStorage.getItem(SHOP_FILTERS_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.warn('Failed to load filters:', error);
    return null;
  }
}

// Clear saved filters
export function clearSavedShopFilters(): void {
  try {
    localStorage.removeItem(SHOP_FILTERS_KEY);
  } catch (error) {
    console.warn('Failed to clear filters:', error);
  }
}

// Get shop URL with saved filters
export function getShopUrlWithFilters(): string {
  try {
    const filters = loadShopFilters();

    if (!filters) {
      return route('shop');
    }

    const params = new URLSearchParams();

    // Handle years array
    if (filters.years && Array.isArray(filters.years)) {
      filters.years.forEach(year => {
        if (year != null && year !== undefined) {
          params.append('years[]', String(year));
        }
      });
    }

    // Handle categories array
    if (filters.categories && Array.isArray(filters.categories)) {
      filters.categories.forEach(category => {
        if (category != null && category !== undefined) {
          params.append('categories[]', String(category));
        }
      });
    }

    // Handle other fields
    if (filters.search && typeof filters.search === 'string') {
      params.set('search', filters.search);
    }

    if (filters.price_min != null && filters.price_min !== undefined) {
      params.set('price_min', String(filters.price_min));
    }

    if (filters.price_max != null && filters.price_max !== undefined) {
      params.set('price_max', String(filters.price_max));
    }

    if (filters.available != null && filters.available !== undefined) {
      params.set('available', String(filters.available));
    }

    if (filters.not_available != null && filters.not_available !== undefined) {
      params.set('not_available', String(filters.not_available));
    }

    // Add page number if it exists
    if (filters.page && filters.page > 1) {
      params.set('page', String(filters.page));
    }

    const queryString = params.toString();
    return queryString ? `${route('shop')}?${queryString}` : route('shop');

  } catch (error) {
    console.error('Error in getShopUrlWithFilters:', error);
    return route('shop');
  }
}
