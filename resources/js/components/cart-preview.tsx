import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Link } from '@inertiajs/react';

import { CartSummary } from '@/types/cart';
import { useCartOperations } from '@/utils/use-cart-operations';
import { formatCartCount } from '@/utils/shop-utils';

interface CartPreviewProps {
    cart: CartSummary;
}

export function CartPreview({ cart: initialCart }: CartPreviewProps) {
    const { cart, isLoading, updateQuantity, removeItem } = useCartOperations(initialCart);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cart.item_count > 0 && (
                        <Badge
                            variant="secondary"
                            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                        >
                            {formatCartCount(cart.item_count)}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Shopping Cart</h3>
                        <span className="text-sm text-muted-foreground">
                            {cart.item_count} items
                        </span>
                    </div>
                    {cart.items.length > 0 ? (
                        <>
                            <ScrollArea className="h-[300px] pr-4">
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
                        </>
                    ) : (
                        <div className="text-center py-6">
                            <ShoppingCart className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">Your cart is empty</p>
                        </div>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
