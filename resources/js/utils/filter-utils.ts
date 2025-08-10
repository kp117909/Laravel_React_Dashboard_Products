
export interface FilterState {
  years: number[];
  categories: number[];
  search?: string;
  price_min?: number;
  price_max?: number;
  available?: boolean;
  not_available?: boolean;
  // Easy to extend with more filters
  // rating?: number;
}

export interface FilterOptions {
  availableYears: number[];
  availableCategories: number[];
  priceRange?: { min: number; max: number };
}

export class FilterChecker {
  private filterState: FilterState;
  private options: FilterOptions;

  constructor(filterState: FilterState, options: FilterOptions) {
    this.filterState = filterState;
    this.options = options;
  }

  /**
   * Check if search filter is active
   */
  private isSearchActive(): boolean {
    return !!this.filterState.search?.trim();
  }

  /**
   * Check if years filter is active
   */
  private isYearsFilterActive(): boolean {
    const { years } = this.filterState;
    const { availableYears } = this.options;

    return years.length > 0 && years.length < availableYears.length;
  }

  /**
   * Check if categories filter is active
   */
  private isCategoriesFilterActive(): boolean {
    const { categories } = this.filterState;
    const { availableCategories } = this.options;

    return categories.length > 0 && categories.length < availableCategories.length;
  }

  /**
   * Check if price filter is active
   */
  private isPriceFilterActive(): boolean {
    const { price_min, price_max } = this.filterState;
    const { priceRange } = this.options;

    if (!priceRange) return false;

    // Only consider price filter active if it's different from the full range
    const isMinFiltered = price_min !== undefined && price_min !== null && price_min > priceRange.min;
    const isMaxFiltered = price_max !== undefined && price_max !== null && price_max < priceRange.max;

    return isMinFiltered || isMaxFiltered;
  }

  /**
   * Check if availability filter is active
   */
  private isAvailabilityFilterActive(): boolean {
    const { available, not_available } = this.filterState;

    // Only show filter when it's actually filtering (not showing all products)
    // Show when only one option is selected, or when neither is selected
    return (Boolean(available) && !not_available) ||
           (!available && Boolean(not_available)) ||
           (!available && !not_available);
  }

  /**
   * Get all active filter checks
   */
  private getActiveFilterChecks(): boolean[] {
    return [
      this.isSearchActive(),
      this.isYearsFilterActive(),
      this.isCategoriesFilterActive(),
      this.isPriceFilterActive(),
      this.isAvailabilityFilterActive(),
    ];
  }

  /**
   * Check if any filters are active
   */
  public hasActiveFilters(): boolean {
    return this.getActiveFilterChecks().some(Boolean);
  }

  /**
   * Get specific active filter types
   */
  public getActiveFilterTypes(): string[] {
    const checks = this.getActiveFilterChecks();
    const types = ['search', 'years', 'categories', 'price', 'availability'];
    return types.filter((_, index) => checks[index]);
  }

  /**
   * Get filter summary for display
   */
  public getFilterSummary(): { type: string; label: string; value: string }[] {
    const summary = [];

    if (this.isSearchActive()) {
      summary.push({
        type: 'search',
        label: 'Search',
        value: this.filterState.search!
      });
    }

    if (this.isYearsFilterActive()) {
      summary.push({
        type: 'years',
        label: 'Years',
        value: `${this.filterState.years.length} selected`
      });
    }

    if (this.isCategoriesFilterActive()) {
      summary.push({
        type: 'categories',
        label: 'Categories',
        value: `${this.filterState.categories.length} selected`
      });
    }

    if (this.isPriceFilterActive()) {
      const { price_min, price_max } = this.filterState;
      let priceText = '';

      if (price_min !== undefined && price_min !== null && price_max !== undefined && price_max !== null) {
        priceText = `$${price_min} - $${price_max}`;
      } else if (price_min !== undefined && price_min !== null) {
        priceText = `$${price_min}+`;
      } else if (price_max !== undefined && price_max !== null) {
        priceText = `Up to $${price_max}`;
      }

      summary.push({
        type: 'price',
        label: 'Price',
        value: priceText
      });
    }

    if (this.isAvailabilityFilterActive()) {
      const { available, not_available } = this.filterState;
      let availabilityText = '';

      if (available === false && not_available === true) {
        availabilityText = 'Not available only';
      } else if (available === true && not_available === false) {
        availabilityText = 'Available only';
      }

      summary.push({
        type: 'availability',
        label: 'Availability',
        value: availabilityText
      });
    }

    return summary;
  }
}

/**
 * Factory function to create filter checker
 */
export function createFilterChecker(
  filterState: FilterState,
  options: FilterOptions
): FilterChecker {
  return new FilterChecker(filterState, options);
}

/**
 * Utility to create clean filter state for URL
 */
export function createCleanFilterState(filters: FilterState): Partial<FilterState> {
  const cleanState: Partial<FilterState> = {};

  if (filters.search?.trim()) {
    cleanState.search = filters.search.trim();
  }

  if (filters.years.length > 0) {
    cleanState.years = filters.years;
  }

  if (filters.categories.length > 0) {
    cleanState.categories = filters.categories;
  }

  return cleanState;
}
