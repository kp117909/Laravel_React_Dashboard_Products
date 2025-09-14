import { router } from '@inertiajs/react';
import { createFilterChecker, type FilterState } from './filter-utils';
import { RequestPayload } from '@inertiajs/inertia';
import { clearSavedShopFilters } from './filter-persistence';
import { useEffect } from 'react';
import { ViewMode } from '@/components/view-switcher';

export function createShopFilterChecker(
  filters: { years: number[]; categories: number[]; search?: string; price_min?: number; price_max?: number; ratings?: number[]; available?: boolean; not_available?: boolean },
  years: number[],
  allCategoryIds: number[],
  priceRange?: { min: number; max: number }
) {
  const filterState: FilterState = {
    years: filters.years || [],
    categories: filters.categories || [],
    search: filters.search,
    price_min: filters.price_min,
    price_max: filters.price_max,
    ratings: filters.ratings || [],
    available: filters.available,
    not_available: filters.not_available
  };

  const options = {
    availableYears: years,
    availableCategories: allCategoryIds,
    priceRange
  };

  return createFilterChecker(filterState, options);
}

/**
 * Clear all filters function
 */
export function clearAllFilters() {
  clearSavedShopFilters();

  router.get(route('shop'), { page: 1 }, {
    preserveState: true,
    replace: true,
    only: ['products', 'filters']
  });
}

/**
 * Update filters with new values
 */
export function updateFilters(
  years: number[],
  categories: number[],
  search?: string,
  price_min?: number,
  price_max?: number,
  ratings?: number[],
  available?: boolean,
  not_available?: boolean
) {
  const params: Record<string, unknown> = {
    years,
    categories,
    page: 1
  };

  if (search !== undefined) {
    params.search = search;
  }

  if (price_min !== undefined) {
    params.price_min = price_min;
  }

  if (price_max !== undefined) {
    params.price_max = price_max;
  }

  if (ratings !== undefined && ratings.length > 0) {
    params.ratings = ratings;
  }

  if (available !== undefined) {
    params.available = available;
  }

  if (not_available !== undefined) {
    params.not_available = not_available;
  }

  router.get(route('shop'), params as RequestPayload, {
    preserveState: true,
    replace: true,
    only: ['products', 'filters']
  });
}

/**
 * Hook to prevent body scrolling when filter sidebar is open on mobile
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLocked]);
}

/**
 * Hook to automatically switch to grid view on small screens
 */
export function useAutoSwitchViewMode(viewMode: ViewMode, setViewMode: (mode: ViewMode) => void) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500 && viewMode === 'list') {
        setViewMode('grid-3');
        localStorage.setItem('shop-view-mode', 'grid-3');
      }
    };

    // Check on mount
    handleResize();

    // Listen for resize events
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [viewMode, setViewMode]);
}

/**
 * Get grid classes based on view mode
 */
export function getGridClasses(viewMode: ViewMode): string {
  const baseClasses = 'grid gap-4 sm:gap-6 w-full max-w-none';

  switch (viewMode) {
    case 'grid-3':
      return `${baseClasses} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3`;
    case 'list':
      return `${baseClasses} grid-cols-1`;
    default:
      return `${baseClasses} grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3`;
  }
}


export function formatCartCount(count: number): string {
  if (count > 99) {
    return '99';
  }
  return count.toString();
}
