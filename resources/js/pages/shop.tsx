import { Link } from '@inertiajs/react';
import ProductCard from '@/components/product-card';
import { Category, type PaginatedResponse, Product } from '@/types';
import ProductFilters from '@/components/product-filter';
import AppShopLayout from '@/layouts/app/app-navigation-layout';
import {FooterShop } from '@/components/footer2';
import { useMemo } from 'react';
import { createShopFilterChecker, clearAllFilters, updateFilters } from '@/utils/shop-utils';
import { X } from 'lucide-react';

interface Props {
  products: PaginatedResponse<Product>;
  filters: {
    years: number[],
    categories: number[],
    search?: string,
    price_min?: number,
    price_max?: number,
    available?: boolean,
    not_available?: boolean
  };
  filterOptions: {
    years: number[];
    categories: Category[];
    priceRange: { min: number; max: number };
  };
  counts: {
    categoryCounts: Record<number, number>;
    yearCounts: Record<number, number>;
    availabilityCounts: Record<string, number>;
  };
}

export default function Shop({ products, filters, filterOptions, counts }: Props) {
  const onYearsChange = (next: Set<number>) => {
    updateFilters(
      Array.from(next),
      Array.from(selectedCategories),
      filters.search,
      filters.price_min,
      filters.price_max,
      filters.available ?? true,
      filters.not_available ?? true
    );
  };

  const onCategoriesChange = (next: Set<number>) => {
    updateFilters(
      Array.from(selectedYears),
      Array.from(next),
      filters.search,
      filters.price_min,
      filters.price_max,
      filters.available ?? true,
      filters.not_available ?? true
    );
  }

  const onPriceChange = (priceRange: [number, number]) => {
    updateFilters(
      Array.from(selectedYears),
      Array.from(selectedCategories),
      filters.search,
      priceRange[0],
      priceRange[1],
      filters.available ?? true,
      filters.not_available ?? true
    );
  };

  const onAvailabilityChange = (available: boolean, notAvailable: boolean) => {
    updateFilters(
      Array.from(selectedYears),
      Array.from(selectedCategories),
      filters.search,
      filters.price_min,
      filters.price_max,
      available,
      notAvailable
    );
  };

  const selectedYears = useMemo(
    () => new Set<number>((filters.years ?? []).map(Number)),
    [filters.years]
  );

  const allCategoryIds = useMemo(() => filterOptions.categories.map(c => c.id), [filterOptions.categories]);

  const selectedCategories = useMemo(
    () => new Set<number>((filters.categories?.length ? filters.categories : allCategoryIds).map(Number)),
    [filters.categories, allCategoryIds]
  );

  const onSearchChange = (search: string) => {
    updateFilters(
      Array.from(selectedYears),
      Array.from(selectedCategories),
      search,
      filters.price_min,
      filters.price_max,
      filters.available ?? true,
      filters.not_available ?? true
    );
  }

  const initialPriceRange: [number, number] = useMemo(() => {
    return [
      filters.price_min ?? filterOptions.priceRange.min,
      filters.price_max ?? filterOptions.priceRange.max
    ];
  }, [filters.price_min, filters.price_max, filterOptions.priceRange]);

  const filterChecker = useMemo(() =>
    createShopFilterChecker(filters, filterOptions.years, allCategoryIds, filterOptions.priceRange),
    [filters, filterOptions.years, allCategoryIds, filterOptions.priceRange]
  );

  const hasActiveFilters = useMemo(() => filterChecker.hasActiveFilters(), [filterChecker]);
  const filterSummary = useMemo(() => filterChecker.getFilterSummary(), [filterChecker]);

  return (
    <AppShopLayout>
      <div className="flex flex-col lg:flex-row w-full gap-6 text-[#1b1b18] dark:text-[#EDEDEC]">

        <div className="w-full lg:w-72 mb-6 lg:mb-0 shadow-lg rounded-lg bg-white dark:bg-[#18181b]">
          <ProductFilters
            categories={filterOptions.categories}
            products = {products.data}
            years={filterOptions.years}
            onYearsChange={onYearsChange}
            selectedYears={selectedYears}
            onCategoriesChange={onCategoriesChange}
            selectedCategories={selectedCategories}
            onSearchChange={onSearchChange}
            onPriceChange={onPriceChange}
            onAvailabilityChange={onAvailabilityChange}
            initialSearch={filters.search || ""}
            initialPriceRange={initialPriceRange}
            priceRange={filterOptions.priceRange}
            initialAvailable={filters.available ?? true}
            initialNotAvailable={filters.not_available ?? true}
            categoryCounts={counts.categoryCounts}
            yearCounts={counts.yearCounts}
            availabilityCounts={counts.availabilityCounts}
          />
        </div>

        <main className="flex flex-col items-center w-full">
          <h1 className="mb-6 text-2xl font-semibold">See products</h1>

          {hasActiveFilters && (
            <div className="mb-4 w-full">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Current Filters
              </h3>
              <div className="flex items-center gap-4 flex-wrap">
                {filterSummary.map((filter) => (
                  <div
                    key={filter.type}
                    className="p-3 bg-white dark:bg-[#1b1b18] rounded-lg"
                  >
                    <p className="text-sm text-[#1b1b18] dark:text-white">
                      {filter.label}: <span className="font-semibold">{filter.value}</span>
                    </p>
                  </div>
                ))}

                <button
                  onClick={clearAllFilters}
                  className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Clear all filters <X className="w-4 h-4 inline-block" />
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
            {products?.data?.length ? (
              products.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-center col-span-full">
                {filters.search ? `No products found for "${filters.search}".` : 'No products to list.'}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center mt-8 gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {products.from || 0} to {products.to || 0} of {products.total || 0} products
            </div>

            <div className="flex justify-center gap-2">
              {products.links?.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.url || '#'}
                  className={`px-3 py-1 rounded border text-sm ${
                    link.active
                      ? 'bg-[#1b1b18] text-white'
                      : 'bg-white text-[#1b1b18] hover:bg-gray-100'
                  } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
      <FooterShop/>
    </AppShopLayout>
  );
}

