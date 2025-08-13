import { useMemo, useEffect } from 'react';
import { createShopFilterChecker } from '@/utils/shop-utils';
import { Category, type PaginatedResponse, Product } from '@/types';
import { saveShopFilters, loadShopFilters, clearSavedShopFilters } from '@/utils/filter-persistence';

interface ShopFilters {
  years: number[];
  categories: number[];
  search?: string;
  price_min?: number;
  price_max?: number;
  available?: boolean;
  not_available?: boolean;
}

interface FilterOptions {
  years: number[];
  categories: Category[];
  priceRange: { min: number; max: number };
}

export const useShopState = (filters: ShopFilters, filterOptions: FilterOptions, products?: PaginatedResponse<Product>) => {
  // Memoized filter states
  const selectedYears = useMemo(
    () => new Set<number>((filters.years ?? []).map(Number)),
    [filters.years]
  );

  const allCategoryIds = useMemo(
    () => filterOptions.categories.map(c => c.id),
    [filterOptions.categories]
  );

  const selectedCategories = useMemo(
    () => new Set<number>(
      (filters.categories?.length ? filters.categories : allCategoryIds).map(Number)
    ),
    [filters.categories, allCategoryIds]
  );

  const initialPriceRange: [number, number] = useMemo(() => [
    filters.price_min ?? filterOptions.priceRange.min,
    filters.price_max ?? filterOptions.priceRange.max
  ], [filters.price_min, filters.price_max, filterOptions.priceRange]);

  const filterChecker = useMemo(() =>
    createShopFilterChecker(filters, filterOptions.years, allCategoryIds, filterOptions.priceRange),
    [filters, filterOptions.years, allCategoryIds, filterOptions.priceRange]
  );

  const hasActiveFilters = useMemo(() => filterChecker.hasActiveFilters(), [filterChecker]);
  const filterSummary = useMemo(() => filterChecker.getFilterSummary(), [filterChecker]);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    saveShopFilters({
      ...filters,
      page: products?.current_page
    });
  }, [filters, products?.current_page]);

  return {
    selectedYears,
    selectedCategories,
    initialPriceRange,
    hasActiveFilters,
    filterSummary,
    // Expose persistence functions for advanced usage
    saveFilters: () => saveShopFilters({ ...filters, page: products?.current_page }),
    loadFilters: loadShopFilters,
    clearSavedFilters: clearSavedShopFilters
  };
};
