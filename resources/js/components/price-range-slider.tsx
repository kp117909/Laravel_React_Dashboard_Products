import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useCallback, useRef } from "react";

interface Props {
  value: number[];
  onChange: (val: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  debounceMs?: number;
}

export default function PriceRangeSlider({
  value,
  onChange,
  min = 0,
  max = 1000,
  step = 10,
  disabled = false,
  debounceMs = 500
}: Props) {
  const [localValue, setLocalValue] = useState(value);
  const [minInput, setMinInput] = useState(value[0].toString());
  const [maxInput, setMaxInput] = useState(value[1].toString());
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    setLocalValue(value);
    setMinInput(value[0].toString());
    setMaxInput(value[1].toString());
  }, [value]);

  // Debounced onChange handler
  const debouncedOnChange = useCallback(
    (newValue: number[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        onChange(newValue);
      }, debounceMs);
    },
    [onChange, debounceMs]
  );

  const handleSliderChange = (newValue: number[]) => {
    setLocalValue(newValue);
    setMinInput(newValue[0].toString());
    setMaxInput(newValue[1].toString());
    debouncedOnChange(newValue);
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value) || min;
    const clampedMin = Math.max(min, Math.min(newMin, localValue[1]));
    setMinInput(e.target.value);

    const newValue = [clampedMin, localValue[1]];
    setLocalValue(newValue);
    debouncedOnChange(newValue);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value) || max;
    const clampedMax = Math.max(localValue[0], Math.min(newMax, max));
    setMaxInput(e.target.value);

    const newValue = [localValue[0], clampedMax];
    setLocalValue(newValue);
    debouncedOnChange(newValue);
  };

  const handleMinBlur = () => {
    const newMin = parseInt(minInput) || min;
    const clampedMin = Math.max(min, Math.min(newMin, localValue[1]));
    setMinInput(clampedMin.toString());

    if (clampedMin !== localValue[0]) {
      const newValue = [clampedMin, localValue[1]];
      setLocalValue(newValue);
      onChange(newValue);
    }
  };

  const handleMaxBlur = () => {
    const newMax = parseInt(maxInput) || max;
    const clampedMax = Math.max(localValue[0], Math.min(newMax, max));
    setMaxInput(clampedMax.toString());

    if (clampedMax !== localValue[1]) {
      const newValue = [localValue[0], clampedMax];
      setLocalValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-3">
    <Label className="text-sm font-medium">Price Range</Label>
      <div className="flex justify-between items-center">

        <div className="flex items-center gap-1 sm:gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>zł</span>
          <Input
            type="number"
            value={minInput}
            onChange={handleMinInputChange}
            onBlur={handleMinBlur}
            min={min}
            max={localValue[1]}
            aria-label="Minimum price"
            className="w-20 sm:w-20 h-6 text-xs"
            disabled={disabled}
          />
          <span>-</span>
          <span>zł</span>
          <Input
            type="number"
            value={maxInput}
            onChange={handleMaxInputChange}
            onBlur={handleMaxBlur}
            min={localValue[0]}
            max={max}
            aria-label="Maximum price"
            className="w-20 sm:w-20 h-6 text-xs"
            disabled={disabled}
          />
        </div>
      </div>

      <Slider
        min={min}
        max={max}
        step={step}
        value={localValue}
        onValueChange={handleSliderChange}
        disabled={disabled}
        className="w-full"
      />

      <div className="flex justify-between text-xs text-gray-500">
        <span>${min}</span>
        <span>${max}</span>
      </div>
    </div>
  );
}
