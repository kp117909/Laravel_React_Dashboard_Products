import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { CartSummary } from '@/types/cart';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useCartOperations } from '@/utils/use-cart-operations';

interface MobileCartPreviewProps {
    cart: CartSummary;
}

export function MobileCartPreview({ cart: initialCart }: MobileCartPreviewProps) {
    const { cart, isLoading, updateQuantity, removeItem } = useCartOperations(initialCart);

    if (cart.items.length === 0) {
        return (
            <div className="text-center py-4 px-2">
                <ShoppingCart className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Your cart is empty</p>
            </div>
        );
    }

    return (
        <div className="py-4 px-2">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Shopping Cart</h3>
                <span className="text-sm text-muted-foreground">
                    {cart.item_count} items
                </span>
            </div>
            <ScrollArea className="h-[200px]">
                <div className="space-y-4">
                    {cart.items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                            <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="h-16 w-16 rounded object-cover"
                            />
                            <div className="flex-1 space-y-1">
                                <h4 className="text-sm font-medium">
                                    {item.product.name}
                                </h4>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center border rounded">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1 || isLoading}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="w-8 text-center text-sm">
                                            {item.quantity}
                                        </span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            disabled={isLoading}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => removeItem(item.id)}
                                        disabled={isLoading}
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                                <p className="text-sm font-medium">
                                    {(item.product.price * item.quantity).toFixed(2)} zł
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <Separator className="my-4" />
            <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm">Subtotal:</span>
                    <span className="text-sm">{cart.subtotal.toFixed(2)} zł</span>
                </div>
                {cart.discount_amount > 0 && (
                    <div className="flex items-center justify-between text-green-600 dark:text-green-400">
                        <span className="text-sm">Discount ({cart.discount_code}):</span>
                        <span className="text-sm">-{cart.discount_amount.toFixed(2)} zł</span>
                    </div>
                )}
                <div className="flex items-center justify-between font-semibold">
                    <span>Total:</span>
                    <span>{cart.total.toFixed(2)} zł</span>
                </div>
            </div>
            <Button asChild className="w-full">
                <Link href={route('cart.index')}>
                    View Cart
                </Link>
            </Button>
        </div>
    );
}
