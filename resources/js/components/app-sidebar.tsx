import { usePage } from '@inertiajs/react'
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Users, ShieldCheck, Github, Linkedin } from 'lucide-react';
import AppLogo from './app-logo'
import { getMainNavItems } from '@/components/nav-items'

const footerNavItems: NavItem[] = [
     {
        title: 'GitHub',
        href: 'https://github.com/kp117909',
        icon: Github,
    },
    {
        title: 'Linkedin',
        href: 'https://www.linkedin.com/in/kamil-polak-875b38279/',
        icon: Linkedin,
    },
];

export function AppSidebar() {
    const { props } = usePage()
    const permissions = props.auth?.permissions as string[] | undefined

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
              <NavMain items={getMainNavItems(permissions)} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
