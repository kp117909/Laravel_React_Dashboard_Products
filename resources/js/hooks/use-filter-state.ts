import { useState, useEffect } from "react";

export interface FilterState {
  search: string;
  priceRange: [number, number];
  available: boolean;
  notAvailable: boolean;
  categorySearch: string;
}

export interface FilterInitialValues {
  initialSearch?: string;
  initialPriceRange?: [number, number];
  initialAvailable?: boolean;
  initialNotAvailable?: boolean;
}

export function useFilterState(
  initialValues: FilterInitialValues,
  priceRange: { min: number; max: number }
) {
  const [state, setState] = useState<FilterState>({
    search: initialValues.initialSearch || "",
    priceRange: initialValues.initialPriceRange || [priceRange.min, priceRange.max],
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
