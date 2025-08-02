import { ArrowBigLeft } from "lucide-react"
import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"

type Props = {
  title: string
  backHref: string
  backLabel?: string
}

export default function BackToListButton({ title, backHref, backLabel = "Return to list" }: Props) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <Button asChild variant="outline">
        <Link href={backHref} className="gap-2 flex items-center">
          <ArrowBigLeft className="h-5 w-5" />
          {backLabel}
        </Link>
      </Button>
    </div>
  )
}
