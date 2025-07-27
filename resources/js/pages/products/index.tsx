import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PaginatedResponse, Product } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { columns } from "@/pages/products/columns";
import { Plus } from 'lucide-react';
import { useCan } from "@/lib/can";
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface Props {
  products: PaginatedResponse<Product>
}

export default function Index({ products }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Products" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Products</h1>
        {useCan('products.create') &&
        <Link
            href={route('products.create')}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 dark:bg-gray-200 text-black dark:text-black dark:hover:bg-gray-300"
            >
            <Plus className="h-4 w-4" />
            Add new product
        </Link>
        }
        <DataTable columns={columns} data={products.data} />
      </div>
    </AppLayout>
  )
}
