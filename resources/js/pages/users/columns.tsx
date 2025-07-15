import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/types/index.d"
import { Link } from '@inertiajs/react'
import { Button } from "@/components/ui/button"
import { DeleteUserDialog } from "@/components/delete-user-dialog"

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
    accessorKey: "role",
    header: "Role",
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
