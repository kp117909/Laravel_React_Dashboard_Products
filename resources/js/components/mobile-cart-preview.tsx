import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { CartSummary } from '@/types/cart';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface MobileCartPreviewProps {
    cart: CartSummary;
}

export function MobileCartPreview({ cart }: MobileCartPreviewProps) {
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
                            <div className="flex-1">
                                <h4 className="text-sm font-medium">
                                    {item.product.name}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Qty: {item.quantity}
                                </p>
                                <p className="text-sm font-medium">
                                    ${(item.product.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <Separator className="my-4" />
            <div className="flex items-center justify-between mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">
                    ${cart.total.toFixed(2)}
                </span>
            </div>
            <Button asChild className="w-full">
                <Link href={route('cart.index')}>
                    View Cart
                </Link>
            </Button>
        </div>
    );
}
