import AppShopLayout from '@/layouts/app/app-navigation-layout';
import { useState, useCallback } from 'react';
import { clearAllFilters, updateFilters } from '@/utils/shop-utils';
import { MobileFilterToggle } from '@/components/mobile-filter-toggle';
import { Category, type PaginatedResponse, Product } from '@/types';

import { ActiveFilters } from '@/pages/shop/active-filters';
import { ProductList } from '@/pages/shop/product-list';
import { Pagination } from '@/pages/shop/pagination';
import { FilterSidebar } from '@/pages/shop/filter-sidebar';
import { useShopState } from '@/hooks/use-shop-state';

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

interface FilterCounts {
  categoryCounts: Record<number, number>;
  yearCounts: Record<number, number>;
  availabilityCounts: Record<string, number>;
}

interface ShopProps {
  products: PaginatedResponse<Product>;
  filters: ShopFilters;
  filterOptions: FilterOptions;
  counts: FilterCounts;
}

export default function Shop({ products, filters, filterOptions, counts }: ShopProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    selectedYears,
    selectedCategories,
    initialPriceRange,
    hasActiveFilters,
    filterSummary
  } = useShopState(filters, filterOptions, products);

  const onYearsChange = useCallback((next: Set<number>) => {
    updateFilters(
      Array.from(next),
      Array.from(selectedCategories),
      filters.search,
      filters.price_min,
      filters.price_max,
      filters.available ?? true,
      filters.not_available ?? true
    );
  }, [selectedCategories, filters.search, filters.price_min, filters.price_max, filters.available, filters.not_available]);

  const onCategoriesChange = useCallback((next: Set<number>) => {
    updateFilters(
      Array.from(selectedYears),
      Array.from(next),
      filters.search,
      filters.price_min,
      filters.price_max,
      filters.available ?? true,
      filters.not_available ?? true
    );
  }, [selectedYears, filters.search, filters.price_min, filters.price_max, filters.available, filters.not_available]);

  const onPriceChange = useCallback((priceRange: [number, number]) => {
    updateFilters(
      Array.from(selectedYears),
      Array.from(selectedCategories),
      filters.search,
      priceRange[0],
      priceRange[1],
      filters.available ?? true,
      filters.not_available ?? true
    );
  }, [selectedYears, selectedCategories, filters.search, filters.available, filters.not_available]);

  const onAvailabilityChange = useCallback((available: boolean, notAvailable: boolean) => {
    updateFilters(
      Array.from(selectedYears),
      Array.from(selectedCategories),
      filters.search,
      filters.price_min,
      filters.price_max,
      available,
      notAvailable
    );
  }, [selectedYears, selectedCategories, filters.search, filters.price_min, filters.price_max]);

  const onSearchChange = useCallback((search: string) => {
    updateFilters(
      Array.from(selectedYears),
      Array.from(selectedCategories),
      search,
      filters.price_min,
      filters.price_max,
      filters.available ?? true,
      filters.not_available ?? true
    );
  }, [selectedYears, selectedCategories, filters.price_min, filters.price_max, filters.available, filters.not_available]);

  const handleClearAllFilters = useCallback(() => {
    clearAllFilters();
  }, []);

  const toggleFilterOpen = useCallback(() => {
    setIsFilterOpen(prev => !prev);
  }, []);

  return (
    <AppShopLayout>
      <div className="container mx-auto flex flex-col lg:flex-row w-full gap-4 lg:gap-6 text-[#1b1b18] dark:text-[#EDEDEC] px-2 sm:px-4 lg:px-6">
        <FilterSidebar
          isFilterOpen={isFilterOpen}
          filterOptions={filterOptions}
          products={products.data}
          filters={filters}
          counts={counts}
          selectedYears={selectedYears}
          selectedCategories={selectedCategories}
          initialPriceRange={initialPriceRange}
          onYearsChange={onYearsChange}
          onCategoriesChange={onCategoriesChange}
          onSearchChange={onSearchChange}
          onPriceChange={onPriceChange}
          onAvailabilityChange={onAvailabilityChange}
        />

        <main className="flex flex-col items-center w-full">
          <h1 className="mb-6 text-2xl font-semibold">See products</h1>

          <ActiveFilters
            filterSummary={filterSummary}
            onClearAll={handleClearAllFilters}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-none">
            <ProductList products={products.data} searchTerm={filters.search} />
          </div>

          <Pagination products={products} />
        </main>
      </div>

      <MobileFilterToggle onClick={toggleFilterOpen} isOpen={isFilterOpen} />
    </AppShopLayout>
  );
}

