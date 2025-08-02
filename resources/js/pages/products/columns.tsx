import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/types";
import {
  PackageCheck,
  PackageMinus,
  Star,
  BookCheck,
  BookMinus,
  ArrowUpIcon,
  ArrowDownIcon
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { ProductActionsCell } from "@/components/product-actions-cell";
import { handleSort } from "@/utils/data-table";

export function getColumns(filterParams: Record<string, string>): ColumnDef<Product>[] {
  return [
    {
      accessorKey: "name",
      header: () => (
        <div
          onClick={() => handleSort("name", filterParams)}
          className="cursor-pointer flex items-center gap-1"
        >
          Name
          {filterParams.sort === "name" &&
            (filterParams.direction === "asc" ? <ArrowUpIcon className="h-4 w-4"/> : <ArrowDownIcon className="h-4 w-4" />)}
        </div>
      ),
      filterFn: "includesString",
    },
    {
        accessorKey: "category",
        header: () => (
            <div onClick={() => handleSort("category_name", filterParams)} className="cursor-pointer flex items-center gap-1">
            Category
            {filterParams.sort === "category_name" &&
                (filterParams.direction === "asc" ? <ArrowUpIcon className="h-4 w-4"/> : <ArrowDownIcon className="h-4 w-4"/>)}
            </div>
        ),
        cell: ({ row }) => row.original.category?.name ?? "-",
    },
    {
      accessorKey: "price",
      header: () => (
        <div
          onClick={() => handleSort("price", filterParams)}
          className="cursor-pointer flex items-center gap-1"
        >
          Price
          {filterParams.sort === "price" &&
            (filterParams.direction === "asc" ? <ArrowUpIcon className="h-4 w-4"/> : <ArrowDownIcon className="h-4 w-4"/>)}
        </div>
      ),
      cell: ({ row }) => {
        const price = Number(row.getValue("price"));
        return <Badge>${price.toFixed(2)} zł</Badge>;
      },
    },
    {
      accessorKey: "is_available",
      header: "Available",
      cell: ({ row }) => {
        const isAvailable = row.getValue("is_available");
        return (
          <div className="flex ml-6">
            <Tooltip>
              <TooltipTrigger asChild>
                {isAvailable ? <PackageCheck /> : <PackageMinus />}
              </TooltipTrigger>
              <TooltipContent>
                <p>{isAvailable ? "Available" : "Not available"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        );
      },
    },
    {
      accessorKey: "is_published",
      header: "Published",
      cell: ({ row }) => {
        const isPublished = row.getValue("is_published");
        return (
          <div className="flex ml-6">
            <Tooltip>
              <TooltipTrigger asChild>
                {isPublished ? <BookCheck /> : <BookMinus />}
              </TooltipTrigger>
              <TooltipContent>
                <p>{isPublished ? "Published" : "Not published"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        );
      },
    },
    {
      accessorKey: "average_rating",
      header: () => (
        <div
          onClick={() => handleSort("average_rating", filterParams)}
          className="cursor-pointer flex items-center gap-1"
        >
          Rating
          {filterParams.sort === "average_rating" &&
            (filterParams.direction === "asc" ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4"/>)}
        </div>
      ),
      cell: ({ row }) => {
        const rating = Number(row.getValue("average_rating"));
        return (
          <Badge variant="secondary">
            {rating ? (
              <>
                {rating.toFixed(1)}
                <Star className="inline-block ml-1" />
              </>
            ) : (
              "-"
            )}
          </Badge>
        );
      },
    },
    {
      accessorKey: "reviews_count",
      header: () => (
        <div
          onClick={() => handleSort("reviews_count", filterParams)}
          className="cursor-pointer flex items-center gap-1"
        >
          Reviews
          {filterParams.sort === "reviews_count" &&
            (filterParams.direction === "asc" ? <ArrowUpIcon className="h-4 w-4"/> : <ArrowDownIcon className="h-4 w-4"/>)}
        </div>
      ),
      cell: ({ row }) => row.getValue("reviews_count") ?? 0,
    },
    {
      accessorKey: "created_at",
      header: () => (
        <div
          onClick={() => handleSort("created_at", filterParams)}
          className="cursor-pointer flex items-center gap-1"
        >
          Created
          {filterParams.sort === "created_at" &&
            (filterParams.direction === "asc" ? <ArrowUpIcon className="h-4 w-4"/> : <ArrowDownIcon className="h-4 w-4"/>)}
        </div>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at"));
        return date.toLocaleDateString();
      },
    },
    {
      id: "actions",
      cell: ({ row }) => <ProductActionsCell product={row.original} />,
    },
  ];
}
