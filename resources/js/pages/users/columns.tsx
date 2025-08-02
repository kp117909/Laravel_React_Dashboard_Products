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
                        filterParams.direction === "asc" ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />
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
                        filterParams.direction === "asc" ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />
                    )}
                </div>
            ),
            filterFn: "includesString",
        },
        {
            accessorKey: "role_name",
            header: () => (
                <div
                    onClick={() => handleSort("role_name", filterParams)}
                    className="cursor-pointer flex items-center gap-1"
                >
                    Roles
                    {filterParams.sort === "role_name" && (
                        filterParams.direction === "asc" ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />
                    )}
                </div>
            ),
            cell: ({ row }) => {
                return row.original.roles.map((role: { name: string }) => <RoleBadge key ={role.name} name={role.name} />)
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
                        filterParams.direction === "asc" ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />
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

