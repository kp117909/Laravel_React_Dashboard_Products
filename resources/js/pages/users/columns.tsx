import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/types/index.d"
import { RoleBadge } from "@/components/role-badge"
import { UserActionsCell } from "@/components/user-actions-cell"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { handleSort } from "@/utils/data-table"

export function getColumns(filterParams: Record<string, string>): ColumnDef<User>[] {
  return [
    {
      accessorKey: "name",
      header: () => (
        <div
          onClick={() => handleSort("name", filterParams)}
          className="cursor-pointer flex items-center gap-1"
        >
          Name
          {filterParams.sort === "name" && (
            filterParams.direction === "asc" ? <ArrowUpIcon className = "h-4 w-4"/> : <ArrowDownIcon className = "h-4 w-4"/>
          )}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: () => (
        <div
          onClick={() => handleSort("email", filterParams)}
          className="cursor-pointer flex items-center gap-1"
        >
          Email
          {filterParams.sort === "email" && (
            filterParams.direction === "asc" ? <ArrowUpIcon className = "h-4 w-4"/> : <ArrowDownIcon className = "h-4 w-4"/>
          )}
        </div>
      ),
      filterFn: "includesString",
    },
    {
      accessorKey: "roles",
      header: () => (
        <div
          onClick={() => handleSort("roles", filterParams)}
          className="cursor-pointer flex items-center gap-1"
        >
          Role
          {filterParams.sort === "roles" && (
            filterParams.direction === "asc" ? <ArrowUpIcon className = "h-4 w-4"/> : <ArrowDownIcon className = "h-4 w-4"/>
          )}
        </div>
      ),
      filterFn: "includesString",
      cell: ({ row }) => {
        const roles = row.original.roles as { name: string; id: number }[];
        return (
          <div className="flex flex-wrap gap-1">
            {roles.map((role) => (
              <RoleBadge key={role.id} name={role.name} />
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: () => (
        <div
          onClick={() => handleSort("created_at", filterParams)}
          className="cursor-pointer flex items-center gap-1"
        >
          Created at
          {filterParams.sort === "created_at" && (
            filterParams.direction === "asc" ? <ArrowUpIcon className = "h-4 w-4"/> : <ArrowDownIcon className = "h-4 w-4"/>
          )}
        </div>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at"));
        return date.toLocaleDateString();
      },
    },
    {
      id: "actions",
      cell: ({ row }) => <UserActionsCell user={row.original} />,
      enableSorting: false,
      enableColumnFilter: false,
    },
  ];
}
