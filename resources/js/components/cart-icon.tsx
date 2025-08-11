import { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { Page } from '@inertiajs/core';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CartSummary {
    item_count: number;
}

interface PageProps extends Record<string, unknown> {
    cart: CartSummary;
}

export function CartIcon() {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        // Initial cart count fetch
        router.get(route('cart.index'), {}, {
            preserveScroll: true,
            preserveState: true,
            only: ['cart'],
            onSuccess: (response) => {
                const { props } = response as Page<PageProps>;
                setItemCount(props.cart.item_count);
            }
        });

        // Listen for page updates
        const unsubscribe = router.on('success', (event) => {
            const { props } = event.detail.page as Page<PageProps>;
            if (props.cart) {
                setItemCount(props.cart.item_count);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <Button asChild variant="ghost" size="icon" className="relative">
            <Link href={route('cart.index')}>
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                    <Badge
                        variant="secondary"
                        className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                        {itemCount}
                    </Badge>
                )}
            </Link>
        </Button>
    );
}
