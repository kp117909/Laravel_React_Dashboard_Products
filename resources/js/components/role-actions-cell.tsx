
import { Role } from "@/types"
import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { DeleteRoleDialog } from "@/components/delete-role-dialog"
import { SquarePen } from "lucide-react"
import { useCan } from "@/lib/can"
import { useLinkWithFilters } from "@/utils/data-table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Props = {
  role: Role
}

export function RoleActionsCell({ role }: Props) {
  const canEdit = useCan("roles.edit")
  const linkWithFilters = useLinkWithFilters()

  return (
    <div className="flex justify-end gap-2">
      {canEdit && (
        <Link href={linkWithFilters("roles.edit", role.id)}>
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
      <DeleteRoleDialog roleId={role.id} roleName={role.name} />
    </div>
  )
}
