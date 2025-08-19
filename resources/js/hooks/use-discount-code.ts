import { useState } from 'react';
import { router } from '@inertiajs/react';
import { CartSummary } from '@/types/cart';
import { toast } from 'sonner';

export function useDiscountCode(cart: CartSummary) {
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleApplyCode = () => {
        if (!code.trim()) return;

        setIsLoading(true);

        router.post(route('cart.apply-discount'), {
            code: code.trim().toUpperCase()
        }, {
            onSuccess: (page) => {
                const flash = page.props.flash as unknown as { success: string, error: string };
                if (flash?.success) {
                    toast.success(flash.success);
                } else if (flash?.error) {
                    toast.error(flash.error);
                }
            },
            onError: (errors) => {
                if (errors.code) {
                    toast.error(errors.code);
                } else if (errors.message) {
                    toast.error(errors.message);
                } else {
                    toast.error('Failed to apply discount code');
                }
            },
            onFinish: () => setIsLoading(false)
        });
    };

    const handleRemoveCode = () => {
        setIsLoading(true);

        router.delete(route('cart.remove-discount'), {
            onSuccess: (page) => {
                const flash = page.props.flash as unknown as { success: string, error: string };
                if (flash?.success) {
                    toast.success(flash.success);
                } else if (flash?.error) {
                    toast.error(flash.error);
                }
            },
            onError: () => {
                toast.error('Failed to remove discount code');
            },
            onFinish: () => setIsLoading(false)
        });
    };

    const hasDiscount = cart.discount_code && cart.discount_amount > 0;

    return {
        code,
        setCode,
        isLoading,
        hasDiscount,
        handleApplyCode,
        handleRemoveCode
    };
}
