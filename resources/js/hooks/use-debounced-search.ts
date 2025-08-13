import { useCallback, useRef } from "react";

export function useDebouncedSearch(
  onSearchChange: (search: string) => void,
  delay: number = 300
) {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  return useCallback(
    (searchTerm: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        onSearchChange(searchTerm);
      }, delay);
    },
    [onSearchChange, delay]
  );
}
