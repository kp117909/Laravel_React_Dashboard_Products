import { router } from '@inertiajs/react';
import { createFilterChecker, type FilterState } from './filter-utils';


export function createWelcomeFilterChecker(
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
  router.get(route('home'), { page: 1 }, {
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
  const params: any = {
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

  router.get(route('home'), params, {
    preserveState: true,
    replace: true,
    only: ['products', 'filters']
  });
}
