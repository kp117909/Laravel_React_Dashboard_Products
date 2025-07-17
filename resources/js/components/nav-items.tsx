import { LayoutGrid, Users, ShieldCheck } from 'lucide-react'
import { NavItem } from '@/types'

export function getMainNavItems(permissions: string[] | undefined): NavItem[] {
  const can = (perm: string) => permissions?.includes(perm)

  return [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutGrid,
    },

    can('users.view') && {
      title: 'Users',
      href: '/users',
      icon: Users,
    },

    can('roles.view') && {
      title: 'Roles',
      href: '/roles',
      icon: ShieldCheck,
    },
  ].filter(Boolean) as NavItem[]
}
