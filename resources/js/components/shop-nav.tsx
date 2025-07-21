import { Link, usePage } from '@inertiajs/react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"


import { NavItemWithAuth, type SharedData } from '@/types';

export default function ShopNav({ navItem = [] }: { navItem?: NavItemWithAuth[] }) {
  const { auth } = usePage<SharedData>().props

  const filteredItems = navItem.filter((item) => {
    if (item.auth === "guest") return !auth.user
    if (item.auth === "auth") return auth.user
    return true
  })

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white dark:bg-[#0a0a0a] shadow">
      <div className="flex items-center px-6 py-3 max-w-screen-xl mx-auto w-full">
        {/* Logo */}
        <div className="flex items-center h-12">
          <img
            src="/images/vibeshop_no_photo.png"
            alt="Logo"
            className="h-20 w-20 object-contain mr-4 rounded"
            style={{ maxHeight: "80px" }}
          />
        </div>

        {/* Desktop menu */}
        <NavigationMenuList className="hidden lg:flex gap-4 items-center ml-auto">
          {filteredItems.map((item, idx) => (
            <NavigationMenuItem key={idx}>
              <NavigationMenuLink asChild>
                <Link
                  href={route(item.href)}
                  method={item.method || "get"}
                  as={item.method === "post" ? "button" : "a"}
                  className={`text-sm px-5 py-1.5 rounded-sm ${
                    item.variant === "primary"
                      ? "text-white bg-[#1b1b18] hover:bg-[#232323] dark:bg-[#EDEDEC] dark:text-[#18181b] dark:hover:bg-[#cfcfcf]"
                      : "border border-[#19140035] text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                  }`}
                >
                  {item.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>

        {/* Mobile Hamburger */}
        <Sheet>
          <SheetTrigger className="ml-auto block lg:hidden">
            <MenuIcon className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left" className="p-6">
            <nav className="flex flex-col gap-4 mt-8">
              {filteredItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={route(item.href)}
                  method={item.method || "get"}
                  as={item.method === "post" ? "button" : "a"}
                  className={`text-sm px-4 py-2 rounded ${
                    item.variant === "primary"
                      ? "text-white bg-[#1b1b18] hover:bg-[#232323] dark:bg-[#EDEDEC] dark:text-[#18181b] dark:hover:bg-[#cfcfcf]"
                      : "border border-[#19140035] text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

