import { usePage } from "@inertiajs/react"
import { NavItemWithAuth, type SharedData } from "@/types"
import { NavMenu } from "./nav-menu"
import { NavigationSheet } from "./navigation-sheet"
import { NavSearch } from "./nav-search"
import AppLogo from "./app-logo"

interface ShopNavProps {
  navItems?: NavItemWithAuth[];
  onSearch?: (searchTerm: string) => void;
  initialSearch?: string;
}

export default function ShopNav({ navItems = [], onSearch, initialSearch }: ShopNavProps) {
  const { auth } = usePage<SharedData>().props

  const filteredItems = navItems.filter((item) => {
    if (item.auth === "guest") return !auth.user
    if (item.auth === "auth") return auth.user
    return true
  })

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-background border-b shadow-sm" aria-label="Main navigation">
      <div className="mx-auto max-w-screen-xl">
        {/* First Row - Logo and Menu */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center mr-4">
            <AppLogo/>
          </div>

          {/* Search - Only on screens >= 1128px */}
          {onSearch && (
            <div className="hidden search-inline-1128 flex-1 justify-center max-w-md">
              <NavSearch onSearch={onSearch} initialSearch={initialSearch} />
            </div>
          )}

          {/* Desktop menu */}
          <div className="hidden md:flex flex-1 justify-end">
            <NavMenu navItems={filteredItems} />
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center">
            <NavigationSheet navItems={filteredItems} />
          </div>
        </div>

        {/* Second Row - Search on screens 768px - 1127px */}
        {onSearch && (
          <div className="hidden search-second-row-1128 px-4 pb-3">
            <div className="w-full max-w-2xl mx-auto">
              <NavSearch onSearch={onSearch} initialSearch={initialSearch} />
            </div>
          </div>
        )}
      </div>
    </nav>

  )
}
