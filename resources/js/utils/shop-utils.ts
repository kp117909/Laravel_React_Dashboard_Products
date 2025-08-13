import { router } from '@inertiajs/react';
import { createFilterChecker, type FilterState } from './filter-utils';
import { RequestPayload } from '@inertiajs/inertia';
import { clearSavedShopFilters } from './filter-persistence';
import { useEffect } from 'react';

export function createShopFilterChecker(
  filters: { years: number[]; categories: number[]; search?: string; price_min?: number; price_max?: number; available?: boolean; not_available?: boolean },
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
