import { ColumnDef } from "@tanstack/react-table";
import { Role } from "@/types";
import { RoleActionsCell } from "@/components/role-actions-cell";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { handleSort } from "@/utils/data-table";
import { Badge } from "@/components/ui/badge";

export function getColumns(filterParams: Record<string, string>): ColumnDef<Role>[] {
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
            filterParams.direction === "asc" ? <ArrowUpIcon /> : <ArrowDownIcon />
          )}
        </div>
      ),
    },
    {
      accessorKey: "permissions",
      header: () => (
        <div
          onClick={() => handleSort("permissions", filterParams)}
          className="cursor-pointer flex items-center gap-1"
        >
          Permissions
          {filterParams.sort === "permissions" && (
            filterParams.direction === "asc" ? <ArrowUpIcon /> : <ArrowDownIcon />
          )}
        </div>
      ),
      cell: ({ row }) => {
        const permissions = row.original.permissions as { name: string; id: number }[];
        return permissions.length ? (
          <div className="flex flex-wrap gap-2">
            {permissions.map((permission, index) => (
              <Badge key={permission.id} className={index >= 12 ? "mt-2" : ""}>
                {permission.name}
              </Badge>
            ))}
          </div>
        ) : (
          "-"
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
            filterParams.direction === "asc" ? <ArrowUpIcon /> : <ArrowDownIcon />
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
      cell: ({ row }) => <RoleActionsCell role={row.original} />,
      enableSorting: false,
      enableColumnFilter: false,
    },
  ];
}

