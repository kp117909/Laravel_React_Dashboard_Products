import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CartSummary as CartSummaryType } from '@/types/cart';

interface CartSummaryProps {
    cart: CartSummaryType;
}

export function CartSummary({ cart }: CartSummaryProps) {
    return (
        <div>
            <Card>
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Items ({cart.item_count})</span>
                            <span>${cart.total.toFixed(2)}</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>${cart.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    <Button className="w-full mt-6" size="lg">
                        Proceed to Checkout
                    </Button>
                </div>
            </Card>
        </div>
    );
}
