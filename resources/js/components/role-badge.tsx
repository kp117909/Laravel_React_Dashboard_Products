// components/RoleBadge.tsx

import { ShieldPlus, UserCog, User, Star, } from "lucide-react"
import { Badge, } from "@/components/ui/badge"
interface RoleBadgeProps {
  name: string
}

export function RoleBadge({ name }: RoleBadgeProps) {
  const iconMap: Record<string, React.ElementType> = {
    Admin: ShieldPlus,
    Moderator: UserCog,
    User: User,
    Premium: Star,
  }

  const Icon = iconMap[name] || User

  return (
    <Badge key={name} variant="secondary" className="bg-gray-900 text-white dark:bg-blue-100 dark:text-black">
      <Icon className="w-12 h-12" />
      {name}
    </Badge>
  )
}
