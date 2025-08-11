import { Accordion } from "@/components/ui/accordion";
import { useState, useEffect, useCallback } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import PriceRangeSlider from "./price-range-slider";
import SearchInput from "./search-input";
import { Category, Product } from "@/types";
import { YearFilter } from "./filters/year-filter";
import { CategoryFilter } from "./filters/category-filter";
import AccordionItemSheet from "./accordion-item";

const ratings = ["4", "3", "2", "1"];

interface Props {
    products: Product[];
    categories: Category[];
    categoryCounts: Record<number, number>;
    yearCounts: Record<number, number>;
    availabilityCounts: Record<string, number>;
    years: number[];
    selectedYears: Set<number>;
    onYearsChange: (years: Set<number>) => void;
    onCategoriesChange: (categories: Set<number>) => void;
    selectedCategories: Set<number>;
    onSearchChange: (search: string) => void;
    onPriceChange?: (priceRange: [number, number]) => void;
    onAvailabilityChange?: (available: boolean, notAvailable: boolean) => void;
    initialSearch?: string;
    initialPriceRange?: [number, number];
    priceRange?: { min: number; max: number };
    initialAvailable?: boolean;
    initialNotAvailable?: boolean;
}

export default function ProductFilters({
     categories,
     categoryCounts,
     yearCounts,
     availabilityCounts,
     products,
     onYearsChange,
     selectedYears,
     years,
     onCategoriesChange,
     selectedCategories,
     onSearchChange,
     onPriceChange,
     onAvailabilityChange,
     initialSearch = "",
     initialPriceRange,
     priceRange = { min: 0, max: 1000 },
     initialAvailable = true,
     initialNotAvailable = true
 }: Props) {

  const [search, setSearch] = useState(initialSearch);
  const [price, setPrice] = useState(initialPriceRange || [priceRange.min, priceRange.max]);
  const [available, setAvailable] = useState(initialAvailable);
  const [notAvailable, setNotAvailable] = useState(initialNotAvailable);

  // For category search
  const [categorySearch, setCategorySearch] = useState("");

  // Update local search state when initialSearch prop changes
  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  // Update local price state when initialPriceRange prop changes
  useEffect(() => {
    if (initialPriceRange) {
      setPrice(initialPriceRange);
    }
  }, [initialPriceRange]);

  // Update local availability state when initial values change
  useEffect(() => {
    setAvailable(initialAvailable);
  }, [initialAvailable]);

  useEffect(() => {
    setNotAvailable(initialNotAvailable);
  }, [initialNotAvailable]);

  // Debounced search handler
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (searchTerm: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          onSearchChange(searchTerm);
        }, 300);
      };
    })(),
    [onSearchChange]
  );

  const handleSearchChange = (search: string) => {
    setSearch(search);
    debouncedSearch(search);
  };

  const handlePriceChange = (newPriceRange: number[]) => {
    setPrice(newPriceRange as [number, number]);
    if (onPriceChange) {
      onPriceChange(newPriceRange as [number, number]);
    }
  };

  const handleAvailableChange = (checked: boolean) => {
    setAvailable(checked);
    if (onAvailabilityChange) {
      onAvailabilityChange(checked, notAvailable);
    }
  };

  const handleNotAvailableChange = (checked: boolean) => {
    setNotAvailable(checked);
    if (onAvailabilityChange) {
      onAvailabilityChange(available, checked);
    }
  };

  return (
    <div className="p-4 space-y-4 lg:space-y-6 text-left bg-white dark:bg-[#18181b] min-h-screen lg:min-h-0 lg:rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-md font-semibold">Filters</h3>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-sm text-blue-600 dark:text-blue-400 lg:hidden"
        >
          Back to top
        </button>
      </div>

      <SearchInput value={search} onChange={handleSearchChange} />
      <PriceRangeSlider
        value={price}
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
            search={categorySearch}
            onSearchChange={setCategorySearch}
          />
        </AccordionItemSheet>

        <AccordionItemSheet value="availability" title={<span className="text-sm font-medium">Availability</span>}>
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="available"
                  checked={available}
                  onCheckedChange={handleAvailableChange}
                />
                <Label htmlFor="available" className="text-sm">Available</Label>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({availabilityCounts.available || 0})
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="not-available"
                  checked={notAvailable}
                  onCheckedChange={handleNotAvailableChange}
                />
                <Label htmlFor="not-available" className="text-sm">Not Available</Label>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({availabilityCounts.not_available || 0})
              </span>
            </div>
          </div>
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
          <div className="space-y-2 pt-2">
            {ratings.map((rate) => (
              <div key={rate} className="flex items-center space-x-2">
                <Checkbox id={`rate-${rate}`} />
                <Label htmlFor={`rate-${rate}`} className="text-sm">
                  {"★".repeat(Number(rate))} & Up
                </Label>
              </div>
            ))}
          </div>
        </AccordionItemSheet>
      </Accordion>
    </div>
  );
}
