import { Accordion } from "@/components/ui/accordion";
import PriceRangeSlider from "./price-range-slider";
import SearchInput from "./search-input";
import { Product, FilterCallbacks, FilterData } from "@/types";
import { YearFilter } from "./filters/year-filter";
import { CategoryFilter } from "./filters/category-filter";
import { AvailabilityFilter } from "./filters/availability-filter";
import { RatingFilter } from "./filters/rating-filter";
import { FilterHeader } from "./filters/filter-header";
import AccordionItemSheet from "./accordion-item";
import { useFilterState, FilterInitialValues } from "@/hooks/use-filter-state";
import { useDebouncedSearch } from "@/hooks/use-debounced-search";


interface ProductFiltersProps extends FilterData, FilterCallbacks, FilterInitialValues {
  products: Product[];
}

export default function ProductFilters({
  categories,
  categoryCounts,
  yearCounts,
  ratingCounts,
  availabilityCounts,
  onYearsChange,
  selectedYears,
  years,
  onCategoriesChange,
  selectedCategories,
  onSearchChange,
  onPriceChange,
  onRatingChange,
  onAvailabilityChange,
  initialSearch = "",
  initialPriceRange,
  priceRange = { min: 0, max: 1000 },
  ratingRange = { min: 0, max: 5 },
  initialAvailable = true,
  initialNotAvailable = true,
  filters
}: ProductFiltersProps) {
  const { state, setState } = useFilterState(
    { initialSearch, initialPriceRange, initialAvailable, initialNotAvailable },
    priceRange,
    ratingRange
  );

  const debouncedSearch = useDebouncedSearch(onSearchChange);

  const handleSearchChange = (search: string) => {
    setState(prev => ({ ...prev, search }));
    debouncedSearch(search);
  };

  const handlePriceChange = (newPriceRange: number[]) => {
    const priceRangeTuple = newPriceRange as [number, number];
    setState(prev => ({ ...prev, priceRange: priceRangeTuple }));
    onPriceChange?.(priceRangeTuple);
  };

  const handleAvailableChange = (checked: boolean) => {
    setState(prev => ({ ...prev, available: checked }));
    onAvailabilityChange?.(checked, state.notAvailable);
  };

  const handleNotAvailableChange = (checked: boolean) => {
    setState(prev => ({ ...prev, notAvailable: checked }));
    onAvailabilityChange?.(state.available, checked);
  };

  const handleCategorySearchChange = (search: string) => {
    setState(prev => ({ ...prev, categorySearch: search }));
  };

  return (
    <div className={`
      p-4 space-y-4 lg:space-y-6
      bg-white dark:bg-[#18181b]
      min-h-screen lg:min-h-0
      lg:rounded-lg
      overflow-y-auto
      max-h-screen lg:max-h-none
    `}>
      <FilterHeader />

      <SearchInput value={state.search} onChange={handleSearchChange} />

      <PriceRangeSlider
        value={state.priceRange}
        onChange={handlePriceChange}
        min={priceRange.min}
        max={priceRange.max}
        step={10}
        debounceMs={500}
      />

      <Accordion type="multiple" className="w-full space-y-2">
        <AccordionItemSheet value="categories" title={<span className="text-sm font-medium">Categories</span>}>
          <CategoryFilter
            categories={categories}
            categoryCounts={categoryCounts}
            selected={selectedCategories}
            onChange={onCategoriesChange}
            search={state.categorySearch}
            onSearchChange={handleCategorySearchChange}
          />
        </AccordionItemSheet>

        <AccordionItemSheet value="availability" title={<span className="text-sm font-medium">Availability</span>}>
          <AvailabilityFilter
            available={state.available}
            notAvailable={state.notAvailable}
            availabilityCounts={availabilityCounts}
            onAvailableChange={handleAvailableChange}
            onNotAvailableChange={handleNotAvailableChange}
          />
        </AccordionItemSheet>

        <AccordionItemSheet value="years" title={<span className="text-sm font-medium">Years</span>}>
          <div className="space-y-2 pt-2">
            <YearFilter
              years={years}
              yearCounts={yearCounts}
              selected={selectedYears}
              onChange={onYearsChange}
            />
          </div>
        </AccordionItemSheet>

        <AccordionItemSheet value="rating" title={<span className="text-sm font-medium">Rating</span>}>
          <RatingFilter
            selectedRatings={filters?.ratings ? new Set(filters.ratings) : new Set()}
            onRatingChange={onRatingChange}
            ratingCounts={ratingCounts}
          />
        </AccordionItemSheet>
      </Accordion>
    </div>
  );
}
