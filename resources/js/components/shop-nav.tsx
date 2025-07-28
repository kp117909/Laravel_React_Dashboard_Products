import { usePage } from "@inertiajs/react"
import { NavItemWithAuth, type SharedData } from "@/types"
import { NavMenu } from "./nav-menu"
import { NavigationSheet } from "./navigation-sheet"
import AppLogo from "./app-logo"

export default function ShopNav({ navItems = [] }: { navItems?: NavItemWithAuth[] }) {
  const { auth } = usePage<SharedData>().props

  const filteredItems = navItems.filter((item) => {
    if (item.auth === "guest") return !auth.user
    if (item.auth === "auth") return auth.user
    return true
  })

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-background border-b shadow-sm">
  <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3">
    <div className="flex items-center mr-4">
      <AppLogo/>
    </div>

    {/* Desktop menu */}
    <div className="hidden md:flex flex-1 justify-end">
      <NavMenu navItems={filteredItems} />
    </div>

    {/* Mobile menu */}
    <div className="md:hidden">
      <NavigationSheet navItems={filteredItems} />
    </div>
  </div>
</nav>

  )
}
