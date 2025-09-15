import { type PropsWithChildren } from 'react';
import NavigationSheet from '@/components/shop-nav';
import { AppShell } from '@/components/app-shell';
import { AppContent } from '@/components/app-content';
import { navItems } from '@/constants/shop-nav-items';
import { FooterShop } from '@/components/footer2';

interface AppShopLayoutProps extends PropsWithChildren {
  onSearch?: (searchTerm: string) => void;
  initialSearch?: string;
}

export default function AppShopLayout({ children, onSearch, initialSearch }: AppShopLayoutProps) {
    return (
        <AppShell variant="navigation">
            <NavigationSheet navItems={navItems} onSearch={onSearch} initialSearch={initialSearch} />
            <AppContent variant="navigation">
                {children}
            </AppContent>
            <FooterShop/>
        </AppShell>
    );
}
