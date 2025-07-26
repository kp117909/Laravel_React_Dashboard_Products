import { ColumnDef } from "@tanstack/react-table"
import { Product } from "@/types/index.d"
import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { DeleteProductDialog } from "@/components/delete-product-dialog"
import { SquarePen, Eye, PackageCheck, PackageMinus, Star} from "lucide-react"
import { can } from "@/lib/can"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

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
        <Tooltip>
            <TooltipTrigger asChild>
                {isAvailable ? <PackageCheck /> : <PackageMinus />}
            </TooltipTrigger>
            <TooltipContent>
                <p>{isAvailable ? "Available" : "Not available"}</p>
            </TooltipContent>
        </Tooltip>
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
    cell: ({ row }) => {
      const product = row.original
      return (
        <div className="flex justify-end gap-2">
          <Link href={route("products.show", product.id)}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View</p>
              </TooltipContent>
            </Tooltip>
          </Link>

          {can("products.edit") && (
            <Link href={route("products.edit", product.id)}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    <SquarePen />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit</p>
                </TooltipContent>
              </Tooltip>
            </Link>
          )}

          {can("products.delete") && (
            <DeleteProductDialog
              productId={product.id}
              productName={product.name}
            />
          )}
        </div>
      )
    },
  },
]
