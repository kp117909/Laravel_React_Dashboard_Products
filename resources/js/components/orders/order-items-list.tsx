import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';
import { OrderItem } from '@/types/order';

interface OrderItemsListProps {
    items: OrderItem[];
}

export function OrderItemsList({ items }: OrderItemsListProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Order Items
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="max-h-96 overflow-y-auto space-y-4 pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
                    {items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
                            <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold truncate">{item.product.name}</h3>
                                <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                                <p className="text-gray-600 text-sm">Price: ${item.price.toFixed(2)}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="font-semibold">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
