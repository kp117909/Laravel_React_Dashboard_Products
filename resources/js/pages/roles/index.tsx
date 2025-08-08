import { DataTable } from "@/components/ui/data-table";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem, PaginatedResponse, Role } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { getColumns } from "@/pages/roles/columns";
import { Plus, X } from "lucide-react";
import { useCan } from "@/lib/can";
import { useQueryParams } from "@/utils/data-table";

const breadcrumbs: BreadcrumbItem[] = [{ title: "Roles", href: "/roles" }];

interface Props {
  roles: PaginatedResponse<Role>;
}

export default function Index({ roles }: Props) {
  const filterParams = useQueryParams();

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Roles" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Roles</h1>
        {useCan("roles.create") && (
          <Link
            href={route("roles.create")}
             className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 dark:bg-gray-200 text-black dark:text-black dark:hover:bg-gray-300"
          >
            <Plus className="h-4 w-4" />
            Add new role
          </Link>
        )}

        <p className="text-sm text-muted-foreground">
          You can search table by role name or permissions.
        </p>


        <DataTable
          columns={getColumns(filterParams)}
          data={roles.data}
          meta={{
            current_page: roles.current_page,
            last_page: roles.last_page,
            per_page: roles.per_page,
            total: roles.total,
          }}
        />
      </div>
    </AppLayout>
  );
}

