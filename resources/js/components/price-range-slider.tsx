import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface Props {
  value: number[];
  onChange: (val: number[]) => void;
  min?: number;
  max?: number;
}

export default function PriceRangeSlider({ value, onChange, min = 0, max = 100 }: Props) {
  return (
    <div className="space-y-2">
      <Label>Price Range: ${value[0]} – ${value[1]}</Label>
      <Slider min={min} max={max} step={1} value={value} onValueChange={onChange} />
    </div>
  );
}
