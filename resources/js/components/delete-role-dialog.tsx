import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { router } from "@inertiajs/react"
import { Trash } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useLinkWithFilters } from "@/utils/data-table";

interface DeleteRoleDialogProps {
  roleId: number
  roleName: string
}

export function DeleteRoleDialog({ roleId, roleName }: DeleteRoleDialogProps) {
  const linkWithFilters = useLinkWithFilters()
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
         <Tooltip>
        <TooltipTrigger asChild>
        <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
                <Trash />
            </Button>
        </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
        <p>Delete</p>
        </TooltipContent>
    </Tooltip>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are u really want to delete <strong>{roleName}</strong>?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => router.delete(linkWithFilters('roles.destroy', roleId))}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
