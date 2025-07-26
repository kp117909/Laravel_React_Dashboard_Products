import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchInput({ value, onChange }: Props) {
  return (
    <div className="space-y-1">
      <Label htmlFor="search">Search</Label>
      <Input
        id="search"
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
