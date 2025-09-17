import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Category } from "@/types"

type Props = {
  categories: Category[]
  value: number | string
  onChange: (value: number) => void
  error?: string
}

export default function CategorySelect({ categories, value, onChange, error }: Props) {
  return (
    <div>
      <Select
        value={String(value)}
        onValueChange={(val) => onChange(Number(val))}
      >
        <SelectTrigger 
          className={error ? "border border-red-500" : ""}
          aria-describedby={error ? "category-error" : undefined}
        >
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category: Category) => (
            <SelectItem key={category.id} value={String(category.id)}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <div id="category-error" className="text-sm text-red-600 mt-1">{error}</div>}
    </div>
  )
}
