import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Link } from "@inertiajs/react"
import { type NavItemWithAuth } from "@/types"
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu"
import AppearanceTabs from "./appearance-tabs"

interface NavMenuProps extends NavigationMenuProps {
  navItems?: NavItemWithAuth[]
}

export const NavMenu = ({ navItems = [], ...props }: NavMenuProps) => {
  const leftItems = navItems.filter(item => item.align !== "right")
  const rightItems = navItems.filter(item => item.align === "right")

function getLinkClass(variant?: string) {
    return `text-sm px-4 py-2 rounded-sm ${
        variant === "primary"
        ? "text-white bg-[#1b1b18] hover:bg-[#232323] dark:bg-[#EDEDEC] dark:text-[#18181b] dark:hover:bg-[#cfcfcf]"
        : "border border-[#19140035] text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
    }`;
}

  return (
    <NavigationMenu {...props} className="w-full">
        <NavigationMenuList className="flex w-full items-center justify-between">
            <AppearanceTabs  showLabel = {false} />
            <div className="flex items-center gap-4">
            {leftItems.map((item, idx) => (
                <NavigationMenuItem key={`left-${idx}`}>
                    <NavigationMenuLink asChild>
                        <Link
                        href={route(item.href)}
                        method={item.method || "get"}
                        as={item.method === "post" ? "button" : "a"}
                        className={getLinkClass(item.variant)}
                        >
                    <span className="flex items-center gap-2">
                        {item.icon && <item.icon className="w-4 h-4" />}
                        {item.title}
                    </span>
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            ))}
            </div>

            <div className="flex items-center gap-4 ml-auto">
            {rightItems.map((item, idx) => (
                <NavigationMenuItem key={`right-${idx}`}>
                    <NavigationMenuLink asChild>
                        <Link
                        href={route(item.href)}
                        method={item.method || "get"}
                        as={item.method === "post" ? "button" : "a"}
                        className={getLinkClass(item.variant)}
                        >
                        <span className="flex items-center gap-2">
                            {item.icon && <item.icon className="w-4  h-4" />}
                            {item.title}
                        </span>
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            ))}
            </div>

        </NavigationMenuList>
    </NavigationMenu>

  );
};

