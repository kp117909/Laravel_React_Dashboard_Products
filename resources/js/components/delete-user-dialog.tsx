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

import{
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"


interface DeleteUserDialogProps {
  userId: number
  userName: string
}

export function DeleteUserDialog({ userId, userName }: DeleteUserDialogProps) {
  return (
<AlertDialog>
  <Tooltip>
    <TooltipTrigger asChild>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash />
        </Button>
      </AlertDialogTrigger>
    </TooltipTrigger>
    <TooltipContent>
      <p>Usuń</p>
    </TooltipContent>
  </Tooltip>

  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>
        Are you sure you want to delete <strong>{userName}</strong>?
      </AlertDialogTitle>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction
        onClick={() => router.delete(route('users.destroy', userId))}
      >
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}
