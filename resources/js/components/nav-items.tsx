import { LayoutGrid, Users, ShieldCheck, PackageSearch, Store } from 'lucide-react'
import { NavItem } from '@/types'

export function getMainNavItems(permissions: string[] = []): NavItem[] {
  const navItems: NavItem[] = [
    {
      title: 'Shop Page',
      href: route('home'),
      icon: Store,
    },
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutGrid,
    },
  ]

  if (permissions.includes('users.view')) {
    navItems.push({
      title: 'Users',
      href: '/users',
      icon: Users,
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

  return navItems
}
