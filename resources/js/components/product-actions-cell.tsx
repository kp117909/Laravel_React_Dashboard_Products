
import { Product } from "@/types"
import { Link } from "@inertiajs/react"
import { useCan } from "@/lib/can"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { SquarePen, Eye } from "lucide-react"
import { DeleteProductDialog } from "@/components/delete-product-dialog"
import { useLinkWithFilters } from "@/utils/data-table"

type Props = {
  product: Product
}

export function ProductActionsCell({ product }: Props) {
  const canEdit = useCan("products.edit")
  const canDelete = useCan("products.delete")
  const linkWithFilters = useLinkWithFilters()
  return (
    <div className="flex justify-end gap-2">
      <Link href={linkWithFilters("products.show", product.id)}>
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

      {canEdit && (
        <Link href={linkWithFilters("products.edit", product.id)}>
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

      {canDelete && (
        <DeleteProductDialog
          productId={product.id}
          productName={product.name}
        />
      )}
    </div>
  )
}
