import { Link, usePage } from "@inertiajs/react"
import { type NavItemWithAuth, type SharedData } from "@/types"
import { AudioLines } from "lucide-react"
import AppearanceTabs from "./appearance-tabs"
import { MobileCartPreview } from "./mobile-cart-preview"
import { Separator } from "./ui/separator"
import { getMobileLinkClass } from "@/utils/navigation"

interface MobileNavMenuProps {
  navItems?: NavItemWithAuth[]
}

export const MobileNavMenu = ({ navItems = [] }: MobileNavMenuProps) => {
  const page = usePage<SharedData>();
  return (
    <nav className="flex flex-col gap-4 mt-8 overflow-y-auto">
      <h1 className="flex ml-2 items-center gap-2">VibeShop <AudioLines/> </h1>
      <AppearanceTabs className = "mr-2 ml-2 flex items-center justify-center"showLabel = {false} />
      {navItems.map((item, idx) => (
        <Link
          key={idx}
          href={route(item.href)}
          method={item.method || "get"}
          as={item.method === "post" ? "button" : "a"}
         className={getMobileLinkClass(item.variant)}
        >
          {item.icon && <item.icon className="w-4 h-4" />}
          {item.title}
        </Link>
      ))}
      <Separator className="my-2" />
      <MobileCartPreview cart={page.props.cart} />
    </nav>
  )
}
