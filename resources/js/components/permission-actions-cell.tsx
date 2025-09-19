import { Permission } from "@/types"
import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { DeletePermissionDialog } from "@/components/delete-permission-dialog"
import { SquarePen } from "lucide-react"
import { useCan } from "@/lib/can"
import { useLinkWithFilters } from "@/utils/data-table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Props = {
  permission: Permission
}

export function PermissionActionsCell({ permission }: Props) {
  const canEdit = useCan("permissions.edit")
  const linkWithFilters = useLinkWithFilters()

  return (
    <div className="flex justify-end gap-2">
      {canEdit && (
        <Link href={linkWithFilters("permissions.edit", permission.id)}>
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
      <DeletePermissionDialog permissionId={permission.id} permissionName={permission.name} />
    </div>
  )
}
