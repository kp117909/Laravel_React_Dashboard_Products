import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from "@/pages/roles/columns";
import { Role } from '@/types/index.d';
import { Link } from '@inertiajs/react'
import { Plus } from 'lucide-react'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
];

interface Props {
  roles: Role[]
}

export default function Index({ roles }: Props) {

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Roles" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Roles</h1>
        <Link
            href={route('roles.create')}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 dark:bg-gray-200 text-black dark:text-black dark:hover:bg-gray-300"
            >
            <Plus className="h-4 w-4" />
            Add new role
        </Link>
        <DataTable columns={columns} data={roles} />
      </div>
    </AppLayout>
  )
}
