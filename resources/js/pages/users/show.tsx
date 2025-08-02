import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react';
import { User } from "@/types";
import { RoleBadge } from '@/components/role-badge';
import { useBackToListUrl } from '@/utils/data-table';
import BackToListButton from '@/components/back-to-list-button';
interface ShowUserProps {
  user: User;
}

const breadcrumbs = (backToListUrl: string): BreadcrumbItem[] => [
  {
    title: 'Users List',
    href: backToListUrl,
  },
  {
    title: 'View',
    href: '/users/show',
  },
]

export default function ShowUser({ user }: ShowUserProps) {
  const backToListUrl = useBackToListUrl('users.index');
  return (
    <AppLayout breadcrumbs={breadcrumbs(backToListUrl)}>
    <Head title={`User view: ${user.name}`} />
    <div className="p-6 space-y-6 rounded-md shadow-md">
        <BackToListButton
            title="User Details"
            backHref={backToListUrl}
            backLabel="Return to user list"
        />
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
          <p>{user.roles?.[0] ? <RoleBadge name={user.roles[0].name} /> : 'Role not found'}</p>
        </div>
        <div>
          <h3 className="font-medium text-muted-foreground">Account created at</h3>
          <p>{new Date(user.created_at).toLocaleString()}</p>
        </div>
      </div>
    </div>
    </AppLayout>
  );
}
