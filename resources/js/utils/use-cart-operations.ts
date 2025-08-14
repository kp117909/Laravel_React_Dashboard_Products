import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Page } from '@inertiajs/core';
import { toast } from 'sonner';
import { CartSummary } from '@/types/cart';

interface PageProps extends Record<string, unknown> {
    cart: CartSummary;
}

export function useCartOperations(initialCart: CartSummary) {
    const [cart, setCart] = useState<CartSummary>(initialCart);
    const [isLoading, setIsLoading] = useState(false);

    // Update local state when initialCart prop changes (e.g., after logout)
    useEffect(() => {
        setCart(initialCart);
    }, [initialCart]);

    const updateQuantity = (itemId: number, quantity: number) => {
        if (quantity < 0) return;

        setIsLoading(true);
        router.patch(route('cart.update', itemId),
            { quantity },
            {
                preserveScroll: true,
                preserveState: true,
                only: ['cart'],
                onSuccess: (response) => {
                    const { props } = response as Page<PageProps>;
                    setCart(props.cart);
                },
                onError: () => {
                    toast.error('Failed to update cart');
                },
                onFinish: () => {
                    setIsLoading(false);
                }
            }
        );
    };

    const removeItem = (itemId: number) => {
        setIsLoading(true);
        router.delete(route('cart.remove', itemId), {
            preserveScroll: true,
            onSuccess: (response) => {
                const { props } = response as Page<PageProps>;
                setCart(props.cart);
                toast.success('Item removed from cart');
            },
            onError: () => {
                toast.error('Failed to remove item');
            },
            onFinish: () => {
                setIsLoading(false);
            }
        });
    };

    const clearCart = () => {
        setIsLoading(true);
        router.post(route('cart.clear'), {}, {
            preserveScroll: true,
            onSuccess: (response) => {
                const { props } = response as Page<PageProps>;
                setCart(props.cart);
                toast.success('Cart cleared');
            },
            onError: () => {
                toast.error('Failed to clear cart');
            },
            onFinish: () => {
                setIsLoading(false);
            }
        });
    };

    return {
        cart,
        isLoading,
        updateQuantity,
        removeItem,
        clearCart
    };
}
