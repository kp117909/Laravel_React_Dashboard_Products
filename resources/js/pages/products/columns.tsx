import { ColumnDef } from "@tanstack/react-table"
import { Product } from "@/types/index.d"
import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { DeleteProductDialog } from "@/components/delete-product-dialog"
import { SquarePen, Eye } from "lucide-react"
import { can } from "@/lib/can"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const columns: ColumnDef<Product, any>[] = [
  {
    accessorKey: "name",
    header: "Name",
    filterFn: "includesString",
  },
  {
    accessorKey: "type",
    header: "Type",
    filterFn: "includesString",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price")
      return `${price.toFixed(2)} zł`
    },
  },
  {
    accessorKey: "is_available",
    header: "Available",
    cell: ({ row }) => {
      const isAvailable = row.getValue("is_available")
      return isAvailable ? "✅" : "❌"
    },
  },
  {
    accessorKey: "avarage_rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.getValue("avarage_rating")
      return rating ? rating.toFixed(1) : "-"
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
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original

      return (
        <div className="flex justify-end gap-2">
          <Link href={route("products.show", product.id)}>
            <Tooltip>
              <TooltipTrigger>
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
                <TooltipTrigger>
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
    enableSorting: false,
    enableColumnFilter: false,
  },
]
