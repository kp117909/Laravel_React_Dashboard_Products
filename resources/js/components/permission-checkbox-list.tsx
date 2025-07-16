import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

type Permission = {
  id: number
  name: string
}

type Props = {
  permissions: Permission[]
  selected: number[]
  onChange: (updated: number[]) => void
}

export default function PermissionCheckboxList({ permissions, selected, onChange }: Props) {
  const grouped = groupByPrefix(permissions)

  const toggle = (id: number, checked: boolean) => {
    const updated = checked
      ? [...selected, id]
      : selected.filter(p => p !== id)

    onChange(updated)
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {Object.entries(grouped).map(([group, perms]) => (
        <div key={group}>
          <h4 className="font-semibold mb-2 capitalize">{group}</h4>
          <div className="grid gap-2">
            {perms.map(permission => (
              <div key={permission.id} className="flex items-center gap-2">
                <Checkbox
                  id={`permission-${permission.id}`}
                  checked={selected.includes(permission.id)}
                  onCheckedChange={(checked) => toggle(permission.id, !!checked)}
                />
                <Label htmlFor={`permission-${permission.id}`} className="capitalize">
                  {permission.name.split('.')[1] || permission.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// helper
function groupByPrefix(permissions: Permission[]): Record<string, Permission[]> {
  const grouped: Record<string, Permission[]> = {}

  permissions.forEach(permission => {
    const prefix = permission.name.split('.')[0] || 'other'

    if (!grouped[prefix]) {
      grouped[prefix] = []
    }

    grouped[prefix].push(permission)
  })

  return grouped
}
