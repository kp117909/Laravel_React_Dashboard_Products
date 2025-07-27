
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

type Props = {
  user: User
}

export function UserActionsCell({ user }: Props) {
  const canEdit = useCan("users.edit")
  const canDelete = useCan("users.delete")

  return (
    <div className="flex justify-end gap-2">
      <Link href={route("users.show", user.id)}>
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
        <Link href={route("users.edit", user.id)}>
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

      {canDelete && <DeleteUserDialog userId={user.id} userName={user.name} />}
    </div>
  )
}
