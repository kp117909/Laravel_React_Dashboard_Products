import { Link, usePage } from "@inertiajs/react"
import { type NavItemWithAuth, type SharedData } from "@/types"
import { AudioLines } from "lucide-react"
import AppearanceTabs from "./appearance-tabs"
import { MobileCartPreview } from "./mobile-cart-preview"
import { Separator } from "./ui/separator"

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
          className={`flex items-center gap-2 text-sm px-4 py-2 mr-2 ml-2 rounded ${
            item.variant === "primary"
              ? "text-white bg-[#1b1b18] hover:bg-[#232323] dark:bg-[#EDEDEC] dark:text-[#18181b] dark:hover:bg-[#cfcfcf]"
              : "border border-[#19140035] text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
          }`}
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
