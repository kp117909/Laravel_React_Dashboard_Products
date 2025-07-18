import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/types/index.d"
import { Link } from '@inertiajs/react'
import { Button } from "@/components/ui/button"
import { DeleteUserDialog } from "@/components/delete-user-dialog"
import { SquarePen, Eye  } from 'lucide-react';
import { can } from "@/lib/can"
import { RoleBadge } from "@/components/role-badge"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export const columns: ColumnDef<User, any>[] = [
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
    id: 'Actions',
    cell: ({ row }) => {
      const user = row.original

      return (
        <div className="flex justify-end gap-2">
          <Link href={route('users.show', user.id)}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size ="sm"><Eye/></Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>View</p>
                </TooltipContent>
            </Tooltip>
          </Link>
         {can('users.edit') &&
          <Link href={route('users.edit', user.id)}>
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
         {can('users.delete') &&
          <DeleteUserDialog userId={user.id} userName={user.name} />
         }
        </div>
      )
    },

    enableSorting: true,
    enableColumnFilter: true,
  },
]
