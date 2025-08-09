import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface YearFilterProps {
  years: number[];
  selected: Set<number>;
  onChange: (next: Set<number>) => void;
}

export function YearFilter({ years, selected, onChange }: YearFilterProps) {
  return (
    <div className="space-y-2">
      {years.map((y) => (
        <div key={y} className="flex items-center space-x-2">
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
      ))}
    </div>
  );
}


