
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

type CheckoxAvailableProductProps = {
  checked: boolean
  onChange: (value: boolean) => void
}

export function CheckoxAvailableProduct({ checked, onChange }: CheckoxAvailableProductProps) {
  return (
    <div className="flex flex-col gap-6">
      <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
        <Checkbox
          id="toggle-2"
          checked={checked}
          onCheckedChange={(val) => onChange(!!val)}
          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
        />
        <div className="grid gap-1.5 font-normal">
          <p className="text-sm leading-none font-medium">
            Product available
          </p>
          <p className="text-muted-foreground text-sm">
            Product will be visible on dashboard but buying will be blocked.
          </p>
        </div>
      </Label>
    </div>
  )
}

