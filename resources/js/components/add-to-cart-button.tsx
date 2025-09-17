import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';

interface AddToCartButtonProps {
    productId: number;
    isAvailable: boolean;
    className?: string;
    variant?: 'default' | 'outline' | 'secondary';
    showQuantity?: boolean;
}

export function AddToCartButton({
    productId,
    isAvailable,
    className = '',
    variant = 'default',
    showQuantity = true
}: AddToCartButtonProps) {
    const [quantity, setQuantity] = useState(1);
    const { isLoading, addToCart } = useCart();

    const handleQuantityChange = (value: number) => {
        if (value >= 1) {
            setQuantity(value);
        }
    };

    const handleAddToCart = () => {
        addToCart(productId, quantity, isAvailable);
    };

    if (!isAvailable) {
        return (
            <Button disabled className={className} variant="secondary">
                Out of Stock
            </Button>
        );
    }

    return (
        <div className="flex items-center gap-2">
            {showQuantity && (
                <div className="flex items-center border rounded-md">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                        aria-label="Product quantity"
                        className="w-16 h-8 text-center border-0"
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(quantity + 1)}
                        aria-label="Increase quantity"
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            )}
            <Button
                onClick={handleAddToCart}
                disabled={isLoading}
                className={className}
                size="sm"
                variant={variant}
            >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
            </Button>
        </div>
    );
}
