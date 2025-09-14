import { useState, useEffect } from "react";

export interface FilterState {
  search: string;
  priceRange: [number, number];
  ratingRange: [number, number];
  available: boolean;
  notAvailable: boolean;
  categorySearch: string;
}

export interface FilterInitialValues {
  initialSearch?: string;
  initialPriceRange?: [number, number];
  initialRatingRange?: [number, number];
  initialAvailable?: boolean;
  initialNotAvailable?: boolean;
}

export function useFilterState(
  initialValues: FilterInitialValues,
  priceRange: { min: number; max: number },
  ratingRange: { min: number; max: number } = { min: 0, max: 5 }
) {
  const [state, setState] = useState<FilterState>({
    search: initialValues.initialSearch || "",
    priceRange: initialValues.initialPriceRange || [priceRange.min, priceRange.max],
    ratingRange: initialValues.initialRatingRange || [ratingRange.min, ratingRange.max],
    available: initialValues.initialAvailable ?? true,
    notAvailable: initialValues.initialNotAvailable ?? true,
    categorySearch: "",
  });

  // Update state when initial values change
  useEffect(() => {
    setState(prev => ({
      ...prev,
      search: initialValues.initialSearch || prev.search,
    }));
  }, [initialValues.initialSearch]);

  useEffect(() => {
    if (initialValues.initialPriceRange) {
      setState(prev => ({
        ...prev,
        priceRange: initialValues.initialPriceRange as [number, number],
      }));
    }
  }, [initialValues.initialPriceRange]);

  useEffect(() => {
    if (initialValues.initialRatingRange) {
      setState(prev => ({
        ...prev,
        ratingRange: initialValues.initialRatingRange as [number, number],
      }));
    }
  }, [initialValues.initialRatingRange]);

  useEffect(() => {
    setState(prev => ({
      ...prev,
      available: initialValues.initialAvailable ?? prev.available,
    }));
  }, [initialValues.initialAvailable]);

  useEffect(() => {
    setState(prev => ({
      ...prev,
      notAvailable: initialValues.initialNotAvailable ?? prev.notAvailable,
    }));
  }, [initialValues.initialNotAvailable]);

  return { state, setState };
}
