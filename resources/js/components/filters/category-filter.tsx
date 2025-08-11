import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Category } from "@/types";
import SearchInput from "../search-input";

interface CategoryFilterProps {
  categories: Category[];
  categoryCounts: Record<number, number>;
  selected: Set<number>;
  onChange: (next: Set<number>) => void;
  search?: string;
  onSearchChange?: (search: string) => void;
}

export function CategoryFilter({
  categories,
  categoryCounts,
  selected,
  onChange,
  search = "",
  onSearchChange,
}: CategoryFilterProps) {
  // If search is provided, filter categories by name
  const filteredCategories = search
    ? categories.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase())
      )
    : categories;

  return (
    <div className="space-y-2">
      {onSearchChange && (
        <SearchInput
          value={search}
          onChange={onSearchChange}
        />
      )}
      <div className="grid gap-2">
        {filteredCategories.map((category) => {
          const productCount = categoryCounts[category.id] || 0;
          return (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={selected.has(category.id)}
                  onCheckedChange={(checked) => {
                    const next = new Set(selected);
                    if (checked) {
                      next.add(category.id);
                    } else {
                      next.delete(category.id);
                    }
                    onChange(next);
                  }}
                />
                <Label htmlFor={`category-${category.id}`} className="text-sm">
                  {category.name}
                </Label>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({productCount})
              </span>
            </div>
          );
        })}
        {filteredCategories.length === 0 && (
          <div className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
            No categories found.
          </div>
        )}
      </div>
    </div>
  );
}
