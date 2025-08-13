import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { getColumns } from "@/pages/users/columns";
import { User, PaginatedResponse} from '@/types/index.d';
import { Plus } from 'lucide-react';
import { useCan } from "@/lib/can";
import { useQueryParams, useLinkWithFilters } from '@/utils/data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

interface Props {
  users: PaginatedResponse<User>
}

export default function Index({ users }: Props) {
  const filterParams = useQueryParams();
  const linkWithFilters = useLinkWithFilters();
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Users</h1>
        {useCan('users.create') &&
        <Link
            href={linkWithFilters('users.create')}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 dark:bg-gray-200 text-black dark:text-black dark:hover:bg-gray-300"
            >
            <Plus  />
            Add new user
        </Link>
        }
        <p className="text-sm text-muted-foreground text-gray-400">
            You can search table by name, email and role.
        </p>
        <DataTable columns={getColumns(filterParams)} data={users.data}
        meta={{
            current_page: users.current_page,
            last_page: users.last_page,
            per_page: users.per_page,
            total: users.total,
          }} />
      </div>
    </AppLayout>
  )
}
