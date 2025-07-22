import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { MobileNavMenu } from "@/components/mobile-nav-menu"
import { NavItemWithAuth } from "@/types"
import AppLogo from "./app-logo"

interface NavigationSheetProps {
  navItems?: NavItemWithAuth[]
}

export const NavigationSheet = ({ navItems = [] }: NavigationSheetProps) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" size="icon" className="rounded-full">
        <Menu />
      </Button>
    </SheetTrigger>
    <SheetContent>
      <MobileNavMenu
        navItems={navItems}
      />
    </SheetContent>
  </Sheet>
)
