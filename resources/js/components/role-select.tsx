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
  value: string
  onChange: (value: string) => void
  error?: string
}

export default function RoleSelect({ roles, value, onChange, error }: Props) {
  return (
    <div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role.name} value={role.name}>
              {role.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <div className="text-sm text-red-600 mt-1">{error}</div>}
    </div>
  )
}

