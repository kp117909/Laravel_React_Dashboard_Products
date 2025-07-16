import AppLayout from '@/layouts/app-layout'
import { Role, Permission, type BreadcrumbItem } from '@/types'
import { Head, useForm } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import { ArrowBigLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PermissionCheckboxList from '@/components/permission-checkbox-list'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Roles',
    href: '/roles',
  },
  {
    title: 'Edit',
    href: '/roles/edit',
  },
]

type FormData = {
  name: string
  permissions: number[]
}

type Props = {
  permissions: Permission[]
  role : Role[]
}


export default function EditRole({ permissions, role}:Props) {
  const { data, setData, put, processing, errors } = useForm<FormData>({
    name: role.name || '',
    permissions: role.permissions.map((p) => p.id),
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    put(route('roles.update', role))
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Role" />
      <div className="p-6 space-y-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Edit Role</h1>

        <Link
          href={route('roles.index')}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300 mb-6"
        >
          <ArrowBigLeft /> Back
        </Link>

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
            Update Role
          </Button>
        </form>
      </div>
    </AppLayout>
  )
}
