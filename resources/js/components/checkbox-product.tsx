
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

type CheckboxProductProductProps = {
  checked: boolean
  onChange: (value: boolean) => void
  label: string
  description: string
}

export function CheckboxProduct({ checked, onChange, label, description }: CheckboxProductProductProps) {
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
            {label}
          </p>
          <p className="text-muted-foreground text-sm">
            {description}
          </p>
        </div>
      </Label>
    </div>
  )
}

