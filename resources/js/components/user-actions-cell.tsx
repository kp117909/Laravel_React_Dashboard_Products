
import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { DeleteUserDialog } from "@/components/delete-user-dialog"
import { SquarePen, Eye } from "lucide-react"
import { useCan } from "@/lib/can"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { User } from "@/types"
import { useLinkWithFilters } from "@/utils/data-table";
type Props = {
  user: User
}

export function UserActionsCell({ user }: Props) {
  const canEdit = useCan("users.edit")
  const canDelete = useCan("users.delete")
  const linkWithFilters = useLinkWithFilters()

  return (
    <div className="flex justify-end gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={linkWithFilters("users.show", user.id)}>
            <Button variant="outline" size="sm">
              <Eye />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>View</p>
        </TooltipContent>
      </Tooltip>

      {canEdit && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={linkWithFilters("users.edit", user.id)}>
              <Button variant="outline" size="sm">
                <SquarePen />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>
      )}

      {canDelete && <DeleteUserDialog userId={user.id} userName={user.name} />}
    </div>
  )
}

