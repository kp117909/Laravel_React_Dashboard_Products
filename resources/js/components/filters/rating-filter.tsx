import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface RatingFilterProps {
  selectedRatings?: Set<number>;
  onRatingChange?: (ratings: Set<number>) => void;
  ratingCounts?: Record<number, number>;
}

export function RatingFilter({ selectedRatings = new Set(), onRatingChange, ratingCounts = {} }: RatingFilterProps) {
  const ratings = [5, 4, 3, 2, 1, 0];

  return (
    <div className="space-y-2 pt-2">
      {ratings.map((rate) => {
        const isChecked = selectedRatings.has(rate);
        const label = rate === 0 ? "No Rating" : "★".repeat(rate);
        const productCount = ratingCounts[rate] || 0;

        return (
          <div key={rate} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`rate-${rate}`}
                checked={isChecked}
                onCheckedChange={(checked) => {
                  const next = new Set(selectedRatings);
                  if (checked) {
                    next.add(rate);
                  } else {
                    next.delete(rate);
                  }
                  onRatingChange?.(next);
                }}
              />
              <Label htmlFor={`rate-${rate}`} className="text-sm">
                {label}
              </Label>
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
