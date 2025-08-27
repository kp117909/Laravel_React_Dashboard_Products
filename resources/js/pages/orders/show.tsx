import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, DollarSign } from 'lucide-react';
import { Order } from '@/types/order';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { formatDate, getStatusColor } from '@/utils/order-utils';
import { OrderItemsList } from '@/components/orders/order-items-list';
interface Props {
    order: Order;
}

export default function OrderShow({ order }: Props) {
    const breadcrumbs = (backToListUrl: string): BreadcrumbItem[] => [
        {
          title: 'Orders',
          href: backToListUrl,
        },
        {
          title: 'View',
          href: '/order/show',
        },
      ];
    return (
        <AppLayout breadcrumbs={breadcrumbs(route('orders.index'))}>
            <Head title={`Order #${order.id}`} />

            <div className="container mx-auto py-8 px-4">
                <div className="mb-6">
                    <Button
                        variant="outline"
                        onClick={() => window.history.back()}
                        className="mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>

                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">Order #{order.id}</h1>
                        <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <OrderItemsList items={order.items} />
                    </div>


                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Calendar className="w-5 h-5 mr-2" />
                                    Order Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Order Date:</span>
                                    <span>{formatDate(order.created_at)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Order ID:</span>
                                    <span>#{order.id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Status:</span>
                                    <Badge className={getStatusColor(order.status)}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <DollarSign className="w-5 h-5 mr-2" />
                                    Order Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                {order.cart?.discount_code && (
                                    <>
                                        <div className="flex justify-between">
                                                <span>Subtotal</span>
                                                <span>${((order.cart?.subtotal) || order.total).toFixed(2)}</span>
                                            </div><div className="flex justify-between text-green-600">
                                                    <span>Discount Code: {order.cart.discount_code}</span>
                                                    <span>-${((order.cart?.discount_amount) || 0).toFixed(2)}</span>
                                        </div>
                                    </>
                                    )}
                                    <div className="border-t pt-2">
                                        <div className="flex justify-between font-semibold text-lg">
                                            <span>Total</span>
                                            <span>${order.total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
