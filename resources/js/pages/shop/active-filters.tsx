import { X } from 'lucide-react';

interface ActiveFiltersProps {
  filterSummary: Array<{ type: string; label: string; value: string }>;
  onClearAll: () => void;
}

export const ActiveFilters = ({ filterSummary, onClearAll }: ActiveFiltersProps) => {
  if (!filterSummary.length) return null;

  return (
    <div className="mb-4 w-full">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Current Filters
      </h3>
      <div className="flex items-center gap-4 flex-wrap">
        {filterSummary.map((filter) => (
          <div
            key={`${filter.type}-${filter.value}`}
            className="p-3 bg-white dark:bg-[#1b1b18] rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <p className="text-sm text-[#1b1b18] dark:text-white">
              {filter.label}: <span className="font-semibold">{filter.value}</span>
            </p>
          </div>
        ))}

        <button
          onClick={onClearAll}
          className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Clear all filters <X className="w-4 h-4 inline-block ml-1" />
        </button>
      </div>
    </div>
  );
};
