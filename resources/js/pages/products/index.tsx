import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Category, PaginatedResponse, Product } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { getColumns } from "@/pages/products/columns";
import { Plus } from 'lucide-react';
import { useCan } from "@/lib/can";
import { useLinkWithFilters, useQueryParams } from '@/utils/data-table';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface Props {
  products: PaginatedResponse<Product>;
  categories: Category[];
}

export default function Index({ products, categories }: Props) {
  const filterParams = useQueryParams();
  const linkWithFilters = useLinkWithFilters();
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Products" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Products</h1>

        {useCan('products.create') && (
          <Link
            href={linkWithFilters('products.create')}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 dark:bg-gray-200 text-black dark:text-black dark:hover:bg-gray-300"
          >
            <Plus className="h-4 w-4" />
            Add new product
          </Link>
        )}

        <p className="text-sm text-muted-foreground">
          You can search table by product name or category.
        </p>
        <DataTable
          columns={getColumns(filterParams)}
          data={products.data}
          meta={{
            current_page: products.current_page,
            last_page: products.last_page,
            per_page: products.per_page,
            total: products.total,
            categories: categories,
          }}
        />
      </div>
    </AppLayout>
  );
}

