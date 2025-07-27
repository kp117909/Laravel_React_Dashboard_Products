import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/types/index.d"
import { RoleBadge } from "@/components/role-badge"
import { UserActionsCell } from "@/components/user-actions-cell"


export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    filterFn: "includesString",
  },
  {
    accessorKey: "email",
    header: "Email",
    filterFn: "includesString",
  },
  {
    accessorKey: "roles",
    header: "Role",
    filterFn: "includesString",
    cell: ({ row }) => {
        const roles = row.original.roles as { name: string, id:number; }[]
        return (
        <div className="flex flex-wrap gap-1">
            {roles.map(role => (
            <RoleBadge key = {role.id} name = {role.name}/>
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
    id: "actions",
    cell: ({ row }) => <UserActionsCell user={row.original} />,
    enableSorting: false,
    enableColumnFilter: false,
  }
]
