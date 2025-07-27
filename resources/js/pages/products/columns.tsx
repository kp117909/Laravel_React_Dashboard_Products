import { ColumnDef } from "@tanstack/react-table"
import { Product } from "@/types/index.d"
import { PackageCheck, PackageMinus, Star, BookCheck, BookMinus} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { ProductActionsCell } from "@/components/product-actions-cell"

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
    filterFn: "includesString",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
        const category = row.original.category;
        return category ? category.name : "-";
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = Number(row.getValue("price"));
      return <Badge>${price.toFixed(2)} zł</Badge>
    },
  },
  {
    accessorKey: "is_available",
    header: "Available",
    cell: ({ row }) => {
    const isAvailable = row.getValue("is_available")
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
    )
    },
  },
    {
        accessorKey: "is_published",
        header: "Published",
        cell: ({ row }) => {
        const isPublished = row.getValue("is_published")
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
        )
        },
    },

  {
    accessorKey: "average_rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = Number(row.getValue("average_rating"))
      return <Badge variant="secondary">
     {rating ? (<>{rating.toFixed(1)}
     <Star className="inline-block ml-1" /></>) : ("-")}
  </Badge>
    },
  },
  {
    accessorKey: "reviews_count",
    header: "Reviews",
    cell: ({ row }) => {
      const count = row.getValue("reviews_count")
      return count ?? 0
    },
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"))
      return date.toLocaleDateString()
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ProductActionsCell product={row.original} />,
  },
]
