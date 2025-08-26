import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Eye } from 'lucide-react';
import AppShopLayout from '@/layouts/app/app-navigation-layout';

interface OrderItem {
    id: number;
    product_id: number;
    quantity: number;
    price: number;
    product: {
        id: number;
        name: string;
        price: number;
        image: string;
    };
}

interface Order {
    id: number;
    user_id: number;
    cart_id: number;
    total: number;
    status: string;
    created_at: string;
    items: OrderItem[];
}

interface Props {
    orders: Order[];
}

export default function OrdersIndex({ orders }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppShopLayout>
            <Head title="My Orders" />

            <div className="container mx-auto py-8 px-4">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">My Orders</h1>
                    <p className="text-gray-600 mt-2">View and track your order history</p>
                </div>

                {orders.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                            <p className="text-gray-600 mb-4">Start shopping to see your orders here</p>
                            <Link href={route('shop')}>
                                <Button>Start Shopping</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <Card key={order.id} className="hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div>
                                                <CardTitle className="text-lg">
                                                    Order #{order.id}
                                                </CardTitle>
                                                <p className="text-sm text-gray-600">
                                                    {formatDate(order.created_at)}
                                                </p>
                                            </div>
                                            <Badge className={getStatusColor(order.status)}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-lg font-semibold">
                                                ${order.total.toFixed(2)}
                                            </span>
                                            <Link href={route('orders.show', order.id)}>
                                                <Button variant="outline" size="sm">
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    View
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {order.items.slice(0, 3).map((item) => (
                                            <div key={item.id} className="flex items-center space-x-3">
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="w-12 h-12 object-cover rounded-md"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-sm truncate">
                                                        {item.product.name}
                                                    </p>
                                                    <p className="text-xs text-gray-600">
                                                        Qty: {item.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        {order.items.length > 3 && (
                                            <div className="flex items-center text-sm text-gray-600">
                                                +{order.items.length - 3} more items
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppShopLayout>
    );
}
