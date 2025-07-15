import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select'

type RoleSelectProps = {
  value: string
  onChange: (value: string) => void
  error?: string
}

export default function RoleSelect({ value, onChange, error }: RoleSelectProps) {
  return (
    <div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger aria-label="Role" className="w-full" />
        <SelectValue placeholder="Choose role" />
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Role</SelectLabel>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && <div className="text-sm text-red-600 mt-1">{error}</div>}
    </div>
  )
}
