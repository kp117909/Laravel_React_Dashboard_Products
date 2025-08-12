import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface RatingFilterProps {
  onRatingChange?: (rating: number) => void;
}

export function RatingFilter({ onRatingChange }: RatingFilterProps) {
  const ratings = ["4", "3", "2", "1"];

  return (
    <div className="space-y-2 pt-2">
      {ratings.map((rate) => (
        <div key={rate} className="flex items-center space-x-2">
          <Checkbox
            id={`rate-${rate}`}
            onCheckedChange={() => onRatingChange?.(Number(rate))}
          />
          <Label htmlFor={`rate-${rate}`} className="text-sm">
            {"★".repeat(Number(rate))} & Up
          </Label>
        </div>
      ))}
    </div>
  );
}
