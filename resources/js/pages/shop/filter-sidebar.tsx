import ProductFilters from '@/components/product-filter';
import { Category, Product } from '@/types';

interface FilterSidebarProps {
  isFilterOpen: boolean;
  filterOptions: {
    years: number[];
    categories: Category[];
    priceRange: { min: number; max: number };
    ratingRange: { min: number; max: number };
  };
  products: Product[];
  filters: {
    years: number[];
    categories: number[];
    search?: string;
    price_min?: number;
    price_max?: number;
    ratings?: number[];
    available?: boolean;
    not_available?: boolean;
  };
  counts: {
    categoryCounts: Record<number, number>;
    yearCounts: Record<number, number>;
    ratingCounts: Record<number, number>;
    availabilityCounts: Record<string, number>;
  };
  selectedYears: Set<number>;
  selectedCategories: Set<number>;
  initialPriceRange: [number, number];
  onYearsChange: (years: Set<number>) => void;
  onCategoriesChange: (categories: Set<number>) => void;
  onSearchChange: (search: string) => void;
  onPriceChange: (priceRange: [number, number]) => void;
  onRatingChange: (ratings: Set<number>) => void;
  onAvailabilityChange: (available: boolean, notAvailable: boolean) => void;
}

export const FilterSidebar = ({
  isFilterOpen,
  filterOptions,
  products,
  filters,
  counts,
  selectedYears,
  selectedCategories,
  initialPriceRange,
  onYearsChange,
  onCategoriesChange,
  onSearchChange,
  onPriceChange,
  onRatingChange,
  onAvailabilityChange
}: FilterSidebarProps) => {
  return (
    <div className={`fixed lg:relative top-0 left-0 right-0 z-50 lg:z-auto w-full lg:w-72 shadow-lg rounded-lg bg-white dark:bg-[#18181b] lg:mb-0 transform transition-transform duration-300 ${isFilterOpen ? 'translate-y-0' : 'translate-y-[100%] lg:translate-y-0'}`}>
      <ProductFilters
        categories={filterOptions.categories}
        products={products}
        years={filterOptions.years}
        onYearsChange={onYearsChange}
        selectedYears={selectedYears}
        onCategoriesChange={onCategoriesChange}
        selectedCategories={selectedCategories}
        onSearchChange={onSearchChange}
        onPriceChange={onPriceChange}
        onRatingChange={onRatingChange}
        onAvailabilityChange={onAvailabilityChange}
        initialSearch={filters.search || ""}
        initialPriceRange={initialPriceRange}
        priceRange={filterOptions.priceRange}
        ratingRange={filterOptions.ratingRange}
        initialAvailable={filters.available ?? true}
        initialNotAvailable={filters.not_available ?? true}
        categoryCounts={counts.categoryCounts}
        yearCounts={counts.yearCounts}
        ratingCounts={counts.ratingCounts}
        availabilityCounts={counts.availabilityCounts}
        filters={filters}
      />
    </div>
  );
};
