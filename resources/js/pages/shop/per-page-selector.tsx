import { router } from '@inertiajs/react';
import { useState, useCallback } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PerPageSelectorProps {
  currentPerPage: number;
  onPerPageChange?: (perPage: number) => void;
}

const PER_PAGE_OPTIONS = [6, 9, 12, 24, 48] as const;

export const PerPageSelector = ({ currentPerPage, onPerPageChange }: PerPageSelectorProps) => {
  const [perPage, setPerPage] = useState(currentPerPage.toString());

  const handlePerPageChange = useCallback((value: string) => {
    const newPerPage = parseInt(value);
    setPerPage(value);

    // Get current URL and update the per_page parameter
    const url = new URL(window.location.href);
    url.searchParams.set('per_page', value);
    url.searchParams.delete('page'); // Reset to first page when changing per_page

    router.visit(url.toString(), {
      preserveState: true,
      preserveScroll: true,
      only: ['products']
    });

    // Call optional callback
    onPerPageChange?.(newPerPage);
  }, [onPerPageChange]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 dark:text-gray-400">Show:</span>
      <Select value={perPage} onValueChange={handlePerPageChange}>
        <SelectTrigger className="w-20 h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {PER_PAGE_OPTIONS.map(option => (
            <SelectItem key={option} value={option.toString()}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-sm text-gray-600 dark:text-gray-400">per page</span>
    </div>
  );
};
