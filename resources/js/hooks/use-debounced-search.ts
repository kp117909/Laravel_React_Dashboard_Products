import { useCallback } from "react";

export function useDebouncedSearch(
  onSearchChange: (search: string) => void,
  delay: number = 300
) {
  return useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (searchTerm: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          onSearchChange(searchTerm);
        }, delay);
      };
    })(),
    [onSearchChange, delay]
  );
}
