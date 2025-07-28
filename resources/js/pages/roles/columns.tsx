import { ColumnDef } from "@tanstack/react-table"
import { Role } from "@/types/index.d"
import { Badge } from "@/components/ui/badge"
import { BadgeCheckIcon} from "lucide-react"
import { RoleActionsCell } from "@/components/role-actions-cell"

export const columns: ColumnDef<Role>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "permissions",
    header: "Permissions",
    cell: ({ row }) => {
        const permissions = row.original.permissions as { name: string }[]
        if (!permissions || permissions.length === 0) return <span><Badge>None</Badge></span>

        return (
        <div className="flex flex-wrap gap-1">
            {permissions.map((p) => (
            <Badge key={p.name} variant="secondary" className="bg-gray-900 text-white dark:bg-blue-100 dark:text-black">
                <BadgeCheckIcon/>{p.name}
            </Badge>
            ))}
        </div>
        )
    },
  },
  {
    accessorKey: "created_at",
    header: "Created at",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"))
      return date.toLocaleDateString()
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-right mr-13">Actions</div>,
    cell: ({ row }) => <RoleActionsCell role={row.original} />,
    enableSorting: true,
    enableColumnFilter: true,
    meta: {
        className: "sticky right-0 bg-background z-10",
    },
  }
]

