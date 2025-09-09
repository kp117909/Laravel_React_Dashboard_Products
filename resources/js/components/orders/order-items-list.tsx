import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ExternalLink } from 'lucide-react';
import { OrderItem } from '@/types/order';
import { ReviewForm } from '@/components/reviews/review-form';
import { Link } from '@inertiajs/react';

interface OrderItemsListProps {
    items: OrderItem[];
    orderId: number;
    reviewedProducts?: number[];
}

export function OrderItemsList({ items, orderId, reviewedProducts = [] }: OrderItemsListProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Order Items
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="max-h-96 overflow-y-auto space-y-4 pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-500">
                    {items.map((item) => (
                        <div key={item.id} className="space-y-4 p-4 border rounded-lg bg-white dark:bg-secondary transition-colors border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-4">
                                <Link
                                    href={route('shop.products.show', item.product.id)}
                                    className="flex items-center space-x-4 flex-1 hover:opacity-80 transition-opacity cursor-pointer"
                                >
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="w-16 h-16 object-cover rounded flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold truncate flex items-center gap-2 text-gray-900 dark:text-gray-100">
                                            {item.product.name}
                                            <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">Quantity: {item.quantity}</p>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">Price: ${item.price.toFixed(2)}</p>
                                    </div>
                                </Link>
                                <div className="text-right flex-shrink-0">
                                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            {/* Review Form */}
                            <ReviewForm
                                productId={item.product.id}
                                orderId={orderId}
                                productName={item.product.name}
                                productImage={item.product.image}
                                hasReviewed={reviewedProducts.includes(item.product.id)}
                            />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
