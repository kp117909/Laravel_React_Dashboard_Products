import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Head } from '@inertiajs/react';
import { User } from "@/types";
import { ArrowBigLeft } from "lucide-react";
import { Link } from "@inertiajs/react";
import { RoleBadge } from '@/components/role-badge';
interface ShowUserProps {
  user: User;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Users View',
    href: '/users',
  },
  {
    title: 'View',
    href: '/users/show',
  },
]

export default function ShowUser({ user }: ShowUserProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <Head title="Users" />
    <div className="p-6 space-y-6 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold">User details</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
        <div>
          <h3 className="font-medium text-muted-foreground">ID</h3>
          <p>{user.id}</p>
        </div>
        <div>
          <h3 className="font-medium text-muted-foreground">Name</h3>
          <p>{user.name}</p>
        </div>
        <div>
          <h3 className="font-medium text-muted-foreground">Email</h3>
          <p>{user.email}</p>
        </div>
        <div>
          <h3 className="font-medium text-muted-foreground">Role</h3>
          <p><RoleBadge name = {user.roles[0]['name']}/></p>
        </div>
        <div>
          <h3 className="font-medium text-muted-foreground">Account created at</h3>
          <p>{new Date(user.created_at).toLocaleString()}</p>
        </div>
      </div>

      <div>
        <Link
          href={route("users.index")}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300"
        >
          <ArrowBigLeft /> Return to users list
        </Link>
      </div>
    </div>
    </AppLayout>
  );
}
