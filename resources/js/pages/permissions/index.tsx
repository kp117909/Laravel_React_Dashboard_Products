import { DataTable } from "@/components/ui/data-table";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem, PaginatedResponse, Permission } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { getColumns } from "@/pages/permissions/columns";
import { Plus } from "lucide-react";
import { useCan } from "@/lib/can";
import { useQueryParams } from "@/utils/data-table";

const breadcrumbs: BreadcrumbItem[] = [{ title: "Permissions", href: "/permissions" }];

interface Props {
  permissions: PaginatedResponse<Permission>;
}

export default function Index({ permissions }: Props) {
  const filterParams = useQueryParams();

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Permissions" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Permissions</h1>
        {useCan("permissions.create") && (
          <Link
            href={route("permissions.create")}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 dark:bg-gray-200 text-black dark:text-black dark:hover:bg-gray-300"
          >
            <Plus className="h-4 w-4" />
            Add new permission
          </Link>
        )}

        <p className="text-sm text-muted-foreground">
          You can search table by permission name.
        </p>

        <DataTable
          columns={getColumns(filterParams)}
          data={permissions.data}
          meta={{
            current_page: permissions.current_page,
            last_page: permissions.last_page,
            per_page: permissions.per_page,
            total: permissions.total,
          }}
        />
      </div>
    </AppLayout>
  );
}
