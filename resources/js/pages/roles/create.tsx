import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, useForm } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import { ArrowBigLeft, ShieldEllipsis } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PermissionCheckboxList from '@/components/permission-checkbox-list';
import { Permission } from '@/types'
import FormLayout from '@/layouts/dashboard/form-layout'
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Roles',
    href: '/roles',
  },
  {
    title: 'Create',
    href: '/roles/create',
  },
]

type FormData = {
  name: string
  permissions: number[]
}

type Props = {
  permissions: Permission[]
}


export default function CreateRole({ permissions }:Props) {
  const { data, setData, post, processing, errors } = useForm<FormData>({
    name: '',
    permissions: [],
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('roles.store'))
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Role" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Create Role</h1>

        <Link
          href={route('roles.index')}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300 mb-6"
        >
          <ArrowBigLeft /> Back
        </Link>
        <FormLayout title="Role Information" description="Create a new role with associated permissions" icon = {ShieldEllipsis}>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium">
              Role Name
            </label>
            <input
              id="name"
              type="text"
              value={data.name}
              onChange={e => setData('name', e.target.value)}
              className="w-full rounded border px-3 py-2"
            />
            {errors.name && <div className="text-sm text-red-600 mt-1">{errors.name}</div>}
          </div>

          <div>
            <label className="block font-medium mb-2">Permissions</label>
            <PermissionCheckboxList
            permissions={permissions}
            selected={data.permissions}
            onChange={(newList) => setData('permissions', newList)}
            />
            {errors.permissions && (
                <div className="text-sm text-red-600 mt-1">{errors.permissions}</div>
            )}
        </div>


          <Button type="submit" disabled={processing}>
            Create Role
          </Button>
        </form>
        </FormLayout>
      </div>
    </AppLayout>
  )
}
