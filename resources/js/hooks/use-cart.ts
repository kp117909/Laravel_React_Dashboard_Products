import { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Page } from '@inertiajs/core';
import { toast } from 'sonner';
import { CartSummary } from '@/types/cart';

interface PageProps extends Record<string, unknown> {
    cart: CartSummary;
}

export function useCart() {
    const { props } = usePage<PageProps>();
    const [itemCount, setItemCount] = useState(props.cart?.item_count || 0);
    const [isLoading, setIsLoading] = useState(false);

    // Update item count when cart data changes
    useEffect(() => {
        if (props.cart) {
            setItemCount(props.cart.item_count);
        }
    }, [props.cart]);

    // Listen for page updates
    useEffect(() => {
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
