import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchInput({ value, onChange }: Props) {
  return (
    <div className="space-y-1">
      <Label htmlFor="search">Search</Label>
      <div className="relative">
        <Input
          id="search"
          placeholder="Search products..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pr-10"
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
            onClick={() => onChange("")}
            aria-label="Clear search"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
}
