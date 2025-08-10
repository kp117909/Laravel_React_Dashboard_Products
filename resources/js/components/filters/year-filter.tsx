import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface YearFilterProps {
  years: number[];
  yearCounts: Record<number, number>;
  selected: Set<number>;
  onChange: (next: Set<number>) => void;
}

export function YearFilter({ years, yearCounts, selected, onChange }: YearFilterProps) {
  return (
    <div className="space-y-2">
      {years.map((y) => {
        const productCount = yearCounts[y] || 0;
        return (
          <div key={y} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`year-${y}`}
                checked={selected.has(y)}
                onCheckedChange={(checked) => {
                  const next = new Set(selected);
                  if (checked) {
                    next.add(y);
                  } else {
                    next.delete(y);
                  }
                  onChange(next);
                }}
              />
              <Label htmlFor={`year-${y}`} className="text-sm">{y}</Label>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({productCount})
            </span>
          </div>
        );
      })}
    </div>
  );
}


