import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppShopLayout from '@/layouts/app/app-navigation-layout';
import { CartSummary } from '@/types/cart';
import ReturnButton from '@/components/return-button';
import { useCartOperations } from '@/utils/use-cart-operations';
import { CartItem } from '@/components/cart/cart-item';
import { CartSummary as CartSummaryComponent } from '@/components/cart/cart-summary';
import { EmptyCart } from '@/components/cart/empty-cart';

interface Props {
    cart: CartSummary;
}

export default function Cart({ cart: initialCart }: Props) {
    const { cart, isLoading, updateQuantity, removeItem, clearCart } = useCartOperations(initialCart);

    return (
        <AppShopLayout
            onSearch={(searchTerm) => {
                window.location.href = `/?search=${encodeURIComponent(searchTerm)}`;
            }}
        >
            <Head title="Shopping Cart" />

            <div className="container mx-auto px-4 lg:px-6">
                <div className="flex items-center justify-between mb-4">
                    <ReturnButton
                        label="Back to Shop"
                        useSavedFilters={true}
                    />
                    <Link href={route('orders.index')}>
                        <Button variant="outline">
                            My Orders
                        </Button>
                    </Link>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-4 mb-2 mt-2 align-middle">
                    <h1 className="text-3xl font-bold">Shopping Cart</h1>
                </div>

                {cart.items.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
                        <div className="lg:col-span-2">
                            <Card>
                                <div className="p-6 space-y-6">
                                    {cart.items.map((item) => (
                                        <CartItem
                                            key={item.id}
                                            item={item}
                                            isLoading={isLoading}
                                            onUpdateQuantity={updateQuantity}
                                            onRemove={removeItem}
                                        />
                                    ))}
                                </div>
                                <div className="p-6 bg-gray-50 border-t dark:bg-[#18181b]">
                                    <Button
                                        variant="ghost"
                                        onClick={clearCart}
                                        disabled={isLoading}
                                        className="w-full"
                                    >
                                        Clear Cart
                                    </Button>
                                </div>
                            </Card>
                        </div>

                        <CartSummaryComponent cart={cart} />
                    </div>
                )}
            </div>
        </AppShopLayout>
    );
}
