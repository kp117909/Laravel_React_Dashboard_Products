import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { Search } from '@/components/ui/search';
import { OrderItem } from '@/components/orders/order-item';
import { Package } from 'lucide-react';
import { Order } from '@/types/order';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PaginatedResponse } from '@/types';
import { useQueryParams } from '@/utils/data-table';

interface Props {
    orders: PaginatedResponse<Order>;
}

export default function Index({ orders }: Props) {
    const filterParams = useQueryParams();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Orders',
            href: '/orders',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Orders" />

            <div className="container mx-auto py-8 px-4">
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">My Orders</h1>
                            <p className="text-gray-600 mt-2">View and track your order history</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-4">
                        <Search
                            placeholder="Search by product name..."
                            className="w-64"
                            initialValue={filterParams.search || ''}
                        />
                    </div>

                </div>

                {orders.data.length === 0 ? (
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
                        {orders.data.map((order: Order) => (
                            <OrderItem key={order.id} order={order} />
                        ))}
                    </div>
                )}


                <Pagination
                    current_page={orders.current_page}
                    last_page={orders.last_page}
                    per_page={orders.per_page}
                    total={orders.total}
                    from={orders.from}
                    to={orders.to}
                />
            </div>
        </AppLayout>
    );
}
