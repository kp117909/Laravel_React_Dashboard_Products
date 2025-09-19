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

interface DeletePermissionDialogProps {
  permissionId: number
  permissionName: string
}

export function DeletePermissionDialog({ permissionId, permissionName }: DeletePermissionDialogProps) {
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
            Are you really want to delete <strong>{permissionName}</strong>?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => router.delete(linkWithFilters('permissions.destroy', permissionId))}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
