import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Page } from '@inertiajs/core';
import { toast } from 'sonner';
import { CartSummary } from '@/types/cart';

interface PageProps extends Record<string, unknown> {
    cart: CartSummary;
}

export function useCart() {
    const [itemCount, setItemCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch initial cart count and listen for updates
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

    // Add item to cart
    const addToCart = (productId: number, quantity: number = 1, isAvailable: boolean = true) => {
        if (!isAvailable) {
            toast.error('This product is currently not available');
            return;
        }

        setIsLoading(true);
        router.post(route('cart.add', productId),
            { quantity },
            {
                preserveScroll: true,
                preserveState: false,
                onSuccess: (response) => {
                    const { props } = response as Page<PageProps>;
                    const itemName = props.cart.items[props.cart.items.length - 1].product.name;
                    toast.success('Added to cart "' + itemName + '"');
                },
                onError: () => {
                    toast.error('Failed to add to cart');
                },
                onFinish: () => {
                    setIsLoading(false);
                }
            }
        );
    };

    return {
        itemCount,
        isLoading,
        addToCart
    };
}
