import { ColumnDef } from "@tanstack/react-table"
import { Role } from "@/types/index.d"
import { Link } from '@inertiajs/react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DeleteRoleDialog } from "@/components/delete-role-dialog"
import { BadgeCheckIcon, SquarePen} from "lucide-react"
import { can } from "@/lib/can"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
        if (!permissions || permissions.length === 0) return <span>Brak</span>

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
    cell: ({ row }) => {
      const role = row.original

      return (
        <div className="flex justify-end gap-2">
        {can('roles.edit') &&
          <Link href={route('roles.edit', role.id)}>
               <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="sm"><SquarePen/></Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Edit</p>
                </TooltipContent>
            </Tooltip>
          </Link>
        }
          <DeleteRoleDialog roleId={role.id} roleName={role.name} />
        </div>
      )
    },
    enableSorting: true,
    enableColumnFilter: true,
    meta: {
      className: "sticky right-0 bg-background z-10", // <== kluczowe
    },
  },
]

