import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Category } from "@/types";

interface CategoryFilterProps {
  categories: Category[];
  selected: Set<number>;
  onChange: (next: Set<number>) => void;
}

export function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  return (
    <div className="grid gap-2">
      {categories.map((category) => (
        <div key={category.id} className="flex items-center space-x-2">
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
      ))}
    </div>
  );
}

