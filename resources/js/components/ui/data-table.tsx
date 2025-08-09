import {flexRender, getCoreRowModel, useReactTable, getSortedRowModel,
    type ColumnDef, type SortingState, type ColumnFiltersState, type VisibilityState} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader,TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuCheckboxItem, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Columns2, X } from "lucide-react";
import {getColumnId,  formatShowingRange, handlePageChange, createHandleSearch, useQueryParams} from "@/utils/data-table";
import CategorySelect from "../category-select";
import { Link } from "@inertiajs/react";
import { Category } from "@/types";


interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  categories?: Category[];
}

interface DataTableProps<TData extends object> {
  columns: ColumnDef<TData>[];
  data: TData[];
  meta: PaginationMeta;
}

export function DataTable<TData extends object>({
  columns,
  data,
  meta,
}: DataTableProps<TData>) {

  // Save filters beetwen pages
  const filterParams = useQueryParams();

  // Search query to all data
  const [searchQuery, setSearchQuery] = useState(filterParams.search || "");
  const handleSearch = useMemo(() => createHandleSearch(250), []);

  const [sorting, setSorting] = useState<SortingState>([]);
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
      columnFilters,
      columnVisibility
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
                setSearchQuery(e.target.value);
                    handleSearch(e.target.value, { category_id: filterParams.category_id });
            }}
            className="max-w-sm"
            type="search"
        />
        {meta.categories && (
            <CategorySelect
            categories={meta.categories}
            value={filterParams.category_id || ""}
            onChange={(val) => handleSearch(searchQuery, { ...filterParams, category_id: val })}
            />
        )}
        {Object.keys(filterParams).length > 0 && !Object.keys(filterParams).every((key) => key === "page") && (
        <div className="flex items-center gap-2">
            <Link
                href={route("roles.index", { ...{}, page: 1 })}
                className="flex items-center gap-1 text-sm text-primary hover:text-primary/90 dark:text-gray-300 dark:hover:text-gray-300"
            >
                <X className="h-4 w-4" />
                Clear filters
            </Link>
        </div>
        )}

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
                  >
                      <span className="flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </span>
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
            onClick={() => handlePageChange(meta.current_page - 1, filterParams)}
            disabled={meta.current_page <= 1}
            >
            Previous Page
            </Button>

            <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(meta.current_page + 1, filterParams)}
            disabled={meta.current_page >= meta.last_page}
            >
            Next Page
        </Button>

          <div className="flex items-center space-x-2">
            <span>Go to page:</span>
            <Input
                type="number"
                min={1}
                max={meta.last_page}
                value={gotoPage}
                onChange={(e) => setGotoPage(e.target.value)}
                className="w-20"
            />
            <Button
                variant="outline"
                size="sm"
                onClick={() => {
                const page = Number(gotoPage);
                if (!isNaN(page)) {
                    handlePageChange(page, filterParams);
                }
                }}
            >
                Go
            </Button>
           </div>


        <div className="ml-4 text-sm text-muted-foreground">
            {formatShowingRange(meta.current_page, meta.per_page, meta.total)}
        </div>
        </div>
      </div>
    </div>
  );
}

