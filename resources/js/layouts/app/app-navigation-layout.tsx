import { type PropsWithChildren } from 'react';
import ShopNav from '@/components/shop-nav';
import { NavItemWithAuth } from '@/types';
import { AppShell } from '@/components/app-shell';
import { AppContent } from '@/components/app-content';

export default function AppShopLayout({children, navItem = []}: PropsWithChildren<{ navItem?: NavItemWithAuth[] }>) {
    return (
        <AppShell variant="navigation">
            <ShopNav navItem = {navItem} />
            <AppContent variant="navigation">
                {children}
            </AppContent>
        </AppShell>
    );
}
