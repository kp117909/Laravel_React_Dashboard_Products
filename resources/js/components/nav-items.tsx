import { LayoutGrid, Users, ShieldCheck, PackageSearch, Store, Package, Key } from 'lucide-react'
import { NavItem } from '@/types'

export function getMainNavItems(permissions: string[] = []): NavItem[] {
  const navItems: NavItem[] = [
    {
      title: 'Shop Page',
      href: route('shop'),
      icon: Store,
    },
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutGrid,
    },
    {
        title: 'My Orders',
        href: '/orders',
        icon: Package,
    },
  ]

  if (permissions.includes('users.view')) {
    navItems.push({
      title: 'Users',
      href: '/users',
      icon: Users,
    })
  }

  if (permissions.includes('orders.management')) {
    navItems.push({
      title: 'Manage Orders',
      href: '/admin-orders',
      icon: Package,
    })
  }

  if (permissions.includes('products.view')) {
    navItems.push({
      title: 'Products',
      href: '/products',
      icon: PackageSearch,
    })
  }

  if (permissions.includes('roles.view')) {
    navItems.push({
      title: 'Roles',
      href: '/roles',
      icon: ShieldCheck,
    })
  }

  if (permissions.includes('permissions.view')) {
    navItems.push({
      title: 'Permissions',
      href: '/permissions',
      icon: Key,
    })
  }


  return navItems
}
