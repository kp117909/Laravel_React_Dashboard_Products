import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/types/index.d"
import { Link } from '@inertiajs/react'
import { Button } from "@/components/ui/button"
import { DeleteUserDialog } from "@/components/delete-user-dialog"
import { Badge } from "@/components/ui/badge"
import { ShieldPlus } from 'lucide-react';

export const columns: ColumnDef<User, any>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "roles",
    header: "Role",
    cell: ({ row }) => {
        const roles = row.original.roles as { name: string }[]
        return (
        <div className="flex flex-wrap gap-1">
            {roles.map(role => (
            <Badge key={role.name} variant="secondary" className="bg-gray-900 text-white dark:bg-blue-100 dark:text-black">
                <ShieldPlus /> {role.name}
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
    header: () => <div className="text-right mr-20">Akcje</div>,
    cell: ({ row }) => {
      const user = row.original

      return (
        <div className="flex justify-end gap-2">
          <Link href={route('users.show', user.id)}>
            <Button variant="default" size="sm">View</Button>
          </Link>
          <Link href={route('users.edit', user.id)}>
            <Button variant="outline" size="sm">Edit</Button>
          </Link>
          <DeleteUserDialog userId={user.id} userName={user.name} />
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
