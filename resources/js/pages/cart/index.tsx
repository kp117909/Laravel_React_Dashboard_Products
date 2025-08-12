import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Page } from '@inertiajs/core';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import AppShopLayout from '@/layouts/app/app-navigation-layout';
import { CartSummary } from '@/types/cart';

interface PageProps extends Record<string, unknown> {
    cart: CartSummary;
}

interface Props {
    cart: CartSummary;
}

export default function Cart({ cart: initialCart }: Props) {
    const [cart, setCart] = useState<CartSummary>(initialCart);
    const [isLoading, setIsLoading] = useState(false);

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

    return (
        <AppShopLayout>
            <Head title="Shopping Cart" />

            <div className="container mx-auto px-4 lg:px-6 py-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Shop
                    </Button>
                    <h1 className="text-3xl font-bold">Shopping Cart</h1>
                </div>

                {cart.items.length === 0 ? (
                    <div className="text-center py-12">
                        <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-4">Add some items to your cart to continue shopping</p>
                        <Button
                            variant="outline"
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Shop
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
                        <div className="lg:col-span-2">
                            <Card>
                                <div className="p-6 space-y-6">
                                    {cart.items.map((item) => (
                                        <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 border-b last:border-0">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{item.product.name}</h3>
                                                <p className="text-gray-500">
                                                    ${item.product.price.toFixed(2)}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                                <div className="flex items-center border rounded-md">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        disabled={isLoading || item.quantity <= 1}
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <Input
                                                        type="number"
                                                        min="1"
                                                        value={item.quantity}
                                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                                        className="w-16 h-8 text-center border-0"
                                                        disabled={isLoading}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        disabled={isLoading}
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeItem(item.id)}
                                                    disabled={isLoading}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-6 bg-gray-50 border-t dark:bg-[#18181b]">
                                    <Button
                                        variant="ghost"
                                        onClick={clearCart}
                                        disabled={isLoading}
                                        className="w-full"
                                    >
                                        Clear Cart<Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </Card>
                        </div>

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
                    </div>
                )}
            </div>
        </AppShopLayout>
    );
}
