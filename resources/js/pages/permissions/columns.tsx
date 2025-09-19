import { ColumnDef } from "@tanstack/react-table";
import { Permission } from "@/types";
import { PermissionActionsCell } from "@/components/permission-actions-cell";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { handleSort } from "@/utils/data-table";

export function getColumns(filterParams: Record<string, string>): ColumnDef<Permission>[] {
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
      cell: ({ row }) => <PermissionActionsCell permission={row.original} />,
      enableSorting: false,
      enableColumnFilter: false,
    },
  ];
}
