import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Role } from "@/types"

type Props = {
  roles: Role[]
  value: number
  onChange: (value: number) => void
  error?: string
}

export default function RoleSelect({ roles, value, onChange, error }: Props) {
  return (
    <div>
      <Select
        value={String(value)}
        onValueChange={(val) => onChange(Number(val))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Wybierz rolę" />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role.id} value={String(role.id)}>
              {role.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <div className="text-sm text-red-600 mt-1">{error}</div>}
    </div>
  )
}
