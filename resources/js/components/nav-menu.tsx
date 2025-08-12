import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Link, usePage } from "@inertiajs/react"
import { type NavItemWithAuth, type SharedData } from "@/types"
import { CartPreview } from "./cart-preview"
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu"
import AppearanceTabs from "./appearance-tabs"
import { getLinkClass } from "@/utils/navigation"
import { useMobileNavigation } from "@/hooks/use-mobile-navigation"

interface NavMenuProps extends NavigationMenuProps {
  navItems?: NavItemWithAuth[]
}

const NavMenuItem = ({ item, cleanup }: { item: NavItemWithAuth, cleanup: () => void }) => (
  <NavigationMenuItem>
    <NavigationMenuLink asChild>
      <Link
        href={route(item.href)}
        method={item.method || "get"}
        as={item.method === "post" ? "button" : "a"}
        className={getLinkClass(item.variant)}
        onClick={() => item.onClick?.(cleanup)}
      >
        <span className="flex items-center gap-2">
          {item.icon && <item.icon className="w-4 h-4" />}
          {item.title}
        </span>
      </Link>
    </NavigationMenuLink>
  </NavigationMenuItem>
);

export const NavMenu = ({ navItems = [], ...props }: NavMenuProps) => {
  const page = usePage<SharedData>();
  const leftItems = navItems.filter(item => item.align !== "right")
  const rightItems = navItems.filter(item => item.align === "right")
  const cleanup = useMobileNavigation();

  return (
    <NavigationMenu {...props} className="w-full">
      <NavigationMenuList className="flex w-full items-center justify-between">
        <AppearanceTabs showLabel={false} />

        <div className="flex items-center gap-4">
          {leftItems.map((item, idx) => (
            <NavMenuItem key={`left-${idx}`} item={item} cleanup={cleanup} />
          ))}
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <CartPreview cart={page.props.cart} />
          {rightItems.map((item, idx) => (
            <NavMenuItem key={`right-${idx}`} item={item} cleanup={cleanup} />
          ))}
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
