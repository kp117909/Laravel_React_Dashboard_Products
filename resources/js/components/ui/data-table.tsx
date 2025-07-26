import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState
} from "@tanstack/react-table";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, Columns2 } from "lucide-react";

interface DataTableProps<TData extends object> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

export function DataTable<TData extends object>({
  columns,
  data
}: DataTableProps<TData>) {
  function getColumnId(col: ColumnDef<TData>): string {
    const raw = col.id ?? ("accessorKey" in col ? col.accessorKey : "");
    return typeof raw === "string" || typeof raw === "number" ? String(raw) : "";
  }

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [gotoPage, setGotoPage] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() =>
    columns.reduce((acc, col) => {
      const colId = getColumnId(col);
      if (colId) acc[colId] = true;
      return acc;
    }, {} as VisibilityState)
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      columnFilters,
      columnVisibility
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  const pageCount = table.getPageCount();

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <Input
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
          type="search"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Columns <Columns2 className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Show / Hide Columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {columns.map((col) => {
              const colId = getColumnId(col);
              return (
                <DropdownMenuCheckboxItem
                  key={colId}
                  checked={!!columnVisibility[colId]}
                  onCheckedChange={(checked) => {
                    setColumnVisibility((old) => ({
                      ...old,
                      [colId]: checked
                    }));
                  }}
                >
                  {typeof col.header === "string" ? col.header : colId}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <span className="flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <ArrowUpDown
                            className={`h-4 w-4 transition ${
                              header.column.getIsSorted()
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        )}
                      </span>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex flex-wrap items-center justify-end gap-2 p-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous Page
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next Page
          </Button>

          <div className="flex items-center space-x-2">
            <span>Go to page:</span>
            <Input
              type="number"
              min={1}
              max={pageCount}
              value={gotoPage}
              onChange={(e) => setGotoPage(e.target.value)}
              className="w-16"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const page = gotoPage ? Number(gotoPage) - 1 : 0;
                if (page >= 0 && page < pageCount) {
                  table.setPageIndex(page);
                }
              }}
            >
              Go
            </Button>
          </div>

          <div className="ml-4">
            Page {table.getState().pagination.pageIndex + 1} of {pageCount}
          </div>
        </div>
      </div>
    </div>
  );
}
