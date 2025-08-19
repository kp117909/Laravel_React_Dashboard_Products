import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { X, Tag } from 'lucide-react';
import { CartSummary } from '@/types/cart';
import { useDiscountCode } from '@/hooks/use-discount-code';

interface DiscountCodeInputProps {
    cart: CartSummary;
}

export function DiscountCodeInput({ cart }: DiscountCodeInputProps) {
    const {
        code,
        setCode,
        isLoading,
        hasDiscount,
        handleApplyCode,
        handleRemoveCode
    } = useDiscountCode(cart);

    return (
        <Card className="p-4">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Discount Code
            </h3>

            {!hasDiscount ? (
                <div className="space-y-3">
                    <div className="flex gap-2">
                        <Input
                            type="text"
                            placeholder="Enter discount code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleApplyCode()}
                            className="flex-1"
                            disabled={isLoading}
                        />
                        <Button
                            onClick={handleApplyCode}
                            disabled={!code.trim() || isLoading}
                            size="sm"
                        >
                            Apply
                        </Button>
                    </div>

                </div>
            ) : (
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800 dark:text-green-200">
                                {cart.discount_code}
                            </span>
                            <span className="text-xs text-green-600 dark:text-green-400">
                                -{cart.discount_percentage}% off
                            </span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleRemoveCode}
                            disabled={isLoading}
                            className="h-6 w-6 p-0 text-green-600 hover:text-green-800"
                        >
                            <X className="h-3 w-3" />
                        </Button>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        You saved ${cart.discount_amount.toFixed(2)}
                    </div>
                </div>
            )}
        </Card>
    );
}
