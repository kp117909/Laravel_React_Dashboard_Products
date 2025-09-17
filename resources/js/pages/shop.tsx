import { useState, useCallback, useEffect } from 'react';
import AppShopLayout from '@/layouts/app/app-navigation-layout';
import { Category, type PaginatedResponse, Product } from '@/types';
import { FilterSidebar } from '@/pages/shop/filter-sidebar';
import { ActiveFilters } from '@/pages/shop/active-filters';
import { ProductList } from '@/pages/shop/product-list';
import { Pagination } from '@/pages/shop/pagination';
import { MobileFilterToggle } from '@/components/mobile-filter-toggle';
import { useShopState } from '@/hooks/use-shop-state';
import { clearAllFilters, updateFilters, useBodyScrollLock, getGridClasses, useAutoSwitchViewMode } from '@/utils/shop-utils';
import { ViewSwitcher, type ViewMode } from '@/components/view-switcher';
import { BestsellersCarousel } from '@/components/bestsellers-carousel-embla';

interface ShopFilters {
  years: number[];
  categories: number[];
  search?: string;
  price_min?: number;
  price_max?: number;
  ratings?: number[];
  available?: boolean;
  not_available?: boolean;
}

interface FilterOptions {
  years: number[];
  categories: Category[];
  priceRange: { min: number; max: number };
  ratingRange: { min: number; max: number };
}

interface FilterCounts {
  categoryCounts: Record<number, number>;
  yearCounts: Record<number, number>;
  ratingCounts: Record<number, number>;
  availabilityCounts: Record<string, number>;
}

interface ShopProps {
  products: PaginatedResponse<Product>;
  filters: ShopFilters;
  filterOptions: FilterOptions;
  counts: FilterCounts;
  bestSellingProducts: Product[];
}

export default function Shop({ products, filters: initialFilters, filterOptions, counts, bestSellingProducts }: ShopProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid-3');

  // Load view mode from localStorage on mount
  useEffect(() => {
    const savedViewMode = localStorage.getItem('shop-view-mode') as ViewMode;
    if (savedViewMode && ['grid-3', 'list'].includes(savedViewMode)) {
      setViewMode(savedViewMode);
    }
  }, []);

  // Save view mode to localStorage when it changes
  const handleViewChange = useCallback((newViewMode: ViewMode) => {
    setViewMode(newViewMode);
    localStorage.setItem('shop-view-mode', newViewMode);
  }, []);

  // Auto-switch to grid view on small screens
  useAutoSwitchViewMode(viewMode, setViewMode);

  const {
    selectedYears,
    selectedCategories,
    initialPriceRange,
    filterSummary
  } = useShopState(initialFilters, filterOptions, products);

  const hasActiveFilters = useCallback(() => {
    return filterSummary.length > 0;
  }, [filterSummary]);

  const onYearsChange = useCallback((next: Set<number>) => {
    updateFilters(
      Array.from(next),
      Array.from(selectedCategories),
      initialFilters.search,
      initialFilters.price_min,
      initialFilters.price_max,
      initialFilters.ratings,
      initialFilters.available ?? true,
      initialFilters.not_available ?? true
    );
  }, [selectedCategories, initialFilters.search, initialFilters.price_min, initialFilters.price_max, initialFilters.ratings, initialFilters.available, initialFilters.not_available]);

  const onCategoriesChange = useCallback((next: Set<number>) => {
    updateFilters(
      Array.from(selectedYears),
      Array.from(next),
      initialFilters.search,
      initialFilters.price_min,
      initialFilters.price_max,
      initialFilters.ratings,
      initialFilters.available ?? true,
      initialFilters.not_available ?? true
    );
  }, [selectedYears, initialFilters.search, initialFilters.price_min, initialFilters.price_max, initialFilters.ratings, initialFilters.available, initialFilters.not_available]);

  const onPriceChange = useCallback((priceRange: [number, number]) => {
    updateFilters(
      Array.from(selectedYears),
      Array.from(selectedCategories),
      initialFilters.search,
      priceRange[0],
      priceRange[1],
      initialFilters.ratings,
      initialFilters.available ?? true,
      initialFilters.not_available ?? true
    );
  }, [selectedYears, selectedCategories, initialFilters.search, initialFilters.ratings, initialFilters.available, initialFilters.not_available]);

  const onAvailabilityChange = useCallback((available: boolean, notAvailable: boolean) => {
    updateFilters(
      Array.from(selectedYears),
      Array.from(selectedCategories),
      initialFilters.search,
      initialFilters.price_min,
      initialFilters.price_max,
      initialFilters.ratings,
      available,
      notAvailable
    );
  }, [selectedYears, selectedCategories, initialFilters.search, initialFilters.price_min, initialFilters.price_max, initialFilters.ratings]);

  const onRatingChange = useCallback((ratings: Set<number>) => {
    updateFilters(
      Array.from(selectedYears),
      Array.from(selectedCategories),
      initialFilters.search,
      initialFilters.price_min,
      initialFilters.price_max,
      Array.from(ratings),
      initialFilters.available ?? true,
      initialFilters.not_available ?? true
    );
  }, [selectedYears, selectedCategories, initialFilters.search, initialFilters.price_min, initialFilters.price_max, initialFilters.available, initialFilters.not_available]);

  const onSearchChange = useCallback((search: string) => {
    updateFilters(
      Array.from(selectedYears),
      Array.from(selectedCategories),
      search,
      initialFilters.price_min,
      initialFilters.price_max,
      initialFilters.ratings,
      initialFilters.available ?? true,
      initialFilters.not_available ?? true
    );
  }, [selectedYears, selectedCategories, initialFilters.price_min, initialFilters.price_max, initialFilters.ratings, initialFilters.available, initialFilters.not_available]);

  const handleClearAllFilters = useCallback(() => {
    clearAllFilters();
  }, []);

  const toggleFilterOpen = useCallback(() => {
    setIsFilterOpen(prev => !prev);
  }, []);

  // Prevent body scrolling when filter is open on mobile
  useBodyScrollLock(isFilterOpen);
  return (
    <AppShopLayout
      onSearch={(searchTerm) => {
        onSearchChange(searchTerm);
      }}
      initialSearch={initialFilters.search || ''}
    >
      {!hasActiveFilters() && (
        <div className="w-full mb-8 px-2 sm:px-4 lg:px-6">
          <BestsellersCarousel products={bestSellingProducts} />
        </div>
      )}

      <div className="container mx-auto flex flex-col lg:flex-row w-full gap-4 lg:gap-6 text-[#1b1b18] dark:text-[#EDEDEC] px-2 sm:px-4 lg:px-6">
        <FilterSidebar
          isFilterOpen={isFilterOpen}
          filterOptions={filterOptions}
          products={products.data}
          filters={initialFilters}
          counts={counts}
          selectedYears={selectedYears}
          selectedCategories={selectedCategories}
          initialPriceRange={initialPriceRange}
          onYearsChange={onYearsChange}
          onCategoriesChange={onCategoriesChange}
          onSearchChange={onSearchChange}
          onPriceChange={onPriceChange}
          onRatingChange={onRatingChange}
          onAvailabilityChange={onAvailabilityChange}
        />

        <div className="flex flex-col items-center w-full">
          <div className="flex items-center justify-between w-full mb-6">
            <h1 className="text-2xl font-semibold">See products</h1>
            <div className="hidden min-[500px]:block">
              <ViewSwitcher currentView={viewMode} onViewChange={handleViewChange} />
            </div>
          </div>

          <ActiveFilters
            filterSummary={filterSummary}
            onClearAll={handleClearAllFilters}
          />

          <div className={getGridClasses(viewMode)}>
            <ProductList products={products.data} searchTerm={initialFilters.search} viewMode={viewMode} />
          </div>

          <Pagination products={products} />
        </div>
      </div>

      <MobileFilterToggle onClick={toggleFilterOpen} isOpen={isFilterOpen} />
    </AppShopLayout>
  );
}

