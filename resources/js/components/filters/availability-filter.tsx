import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface AvailabilityFilterProps {
  available: boolean;
  notAvailable: boolean;
  availabilityCounts: Record<string, number>;
  onAvailableChange: (checked: boolean) => void;
  onNotAvailableChange: (checked: boolean) => void;
}

export function AvailabilityFilter({
  available,
  notAvailable,
  availabilityCounts,
  onAvailableChange,
  onNotAvailableChange,
}: AvailabilityFilterProps) {
  return (
    <div className="space-y-2 pt-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="available"
            checked={available}
            onCheckedChange={onAvailableChange}
          />
          <Label htmlFor="available" className="text-sm">Available</Label>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          ({availabilityCounts.available || 0})
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="not-available"
            checked={notAvailable}
            onCheckedChange={onNotAvailableChange}
          />
          <Label htmlFor="not-available" className="text-sm">Not Available</Label>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          ({availabilityCounts.not_available || 0})
        </span>
      </div>
    </div>
  );
}
