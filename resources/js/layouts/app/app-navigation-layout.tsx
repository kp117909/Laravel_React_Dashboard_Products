import { type PropsWithChildren } from 'react';
import NavigationSheet from '@/components/shop-nav';
import { AppShell } from '@/components/app-shell';
import { AppContent } from '@/components/app-content';
import { navItems } from '@/constants/shop-nav-items';

export default function AppShopLayout({children}: PropsWithChildren) {
    return (
        <AppShell variant="navigation">
            <NavigationSheet navItems = {navItems} />
            <AppContent variant="navigation">
                {children}
            </AppContent>
        </AppShell>
    );
}
