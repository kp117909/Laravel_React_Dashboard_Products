import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, User, Mail } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Order } from '@/types/order';
import { OrderItem } from '@/types/order';
import { formatDate, getStatusColor } from '@/utils/order-utils';

interface OrderItemAdminProps {
    order: Order;
}

export function OrderItemAdmin({ order }: OrderItemAdminProps) {
    return (
        <Card className="hover:shadow-md transition-shadow">
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
                            {order.total.toFixed(2)} zł
                        </span>
                        <Link href={route('orders.admin.show', order.id)}>
                            <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-2" />
                                View
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {/* Customer Information */}
                {order.user && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-sm mb-2">Customer</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                                <User className="w-4 h-4" />
                                <span>{order.user.name}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Mail className="w-4 h-4" />
                                <span>{order.user.email}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Order Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {order.items.slice(0, 3).map((item: OrderItem) => (
                        <div key={item.id} className="flex items-center space-x-3">
                            <img
                                src={item.product.image || '/images/placeholder.png'}
                                alt={item.product.name}
                                className="w-12 h-12 object-cover rounded-md bg-gray-200"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">
                                    {item.product.name}
                                </p>
                                <p className="text-xs text-gray-600">
                                    Qty: {item.quantity} × {item.price.toFixed(2)} zł
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
    );
}
