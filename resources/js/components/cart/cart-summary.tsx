import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CartSummary as CartSummaryType } from '@/types/cart';
import { DiscountCodeInput } from '@/components/discount-code-input';
import { useForm } from '@inertiajs/react';

interface CartSummaryProps {
    cart: CartSummaryType;
}

export function CartSummary({ cart }: CartSummaryProps) {
    const { post } = useForm()

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('orders.store'))
      }

    return (
        <div className="space-y-4">
            <DiscountCodeInput cart={cart} />

            <Card>
                <form onSubmit={submit}>
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal ({cart.item_count} items)</span>
                                <span>${cart.subtotal.toFixed(2)}</span>
                            </div>

                            {cart.discount_amount > 0 && (
                                <div className="flex justify-between text-green-600 dark:text-green-400">
                                    <span>Discount ({cart.discount_code})</span>
                                    <span>-${cart.discount_amount.toFixed(2)}</span>
                                </div>
                            )}

                            <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>${cart.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        <Button type="submit" className="w-full mt-6" size="lg">
                            Proceed to Checkout
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
