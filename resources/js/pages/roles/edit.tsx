import AppLayout from '@/layouts/app-layout'
import { Role, Permission, type BreadcrumbItem } from '@/types'
import { Head, useForm } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import { ArrowBigLeft, ShieldEllipsis } from 'lucide-react'
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
  role : Role
}


export default function EditRole({ permissions, role}:Props) {
  const { data, setData, put, processing, errors } = useForm<FormData>({
    name: role.name || '',
    permissions: role.permissions.map((p) => p.id),
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    put(route('roles.update', role.id))
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <Head title="Edit Role" />
        <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Edit Role</h1>

        <Link
            href={route('roles.index')}
            className="inline-flex items-center gap-2 rounded-md bg-neutral-100 px-4 py-2 dark:text-black dark:hover:bg-neutral-200 mb-6"
        >
            <ArrowBigLeft /> Back
        </Link>

            <form onSubmit={submit} className="space-y-4">
                <div className="md:grid md:grid-cols-2 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 dark:text-white">Role Information</h3>
                    <p className="mt-1 text-sm text-gray-400">
                        Change the role&apos;s name and associated permissions <ShieldEllipsis className="inline-block" />
                    </p>
                    </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="shadow-md sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 dark:bg-neutral-900 space-y-6 sm:p-6">
                                <div>
                                    <label htmlFor="name" className="block font-medium dark:text-white">
                                    Role Name
                                    </label>
                                    <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full rounded border px-3 py-2 dark:bg-neutral-900 dark:text-white"
                                    />
                                    {errors.name && <div className="text-sm text-red-600 mt-1">{errors.name}</div>}
                                </div>

                                <div>
                                    <label className="block font-medium mb-2 dark:text-white">Permissions</label>
                                    <PermissionCheckboxList
                                    permissions={permissions}
                                    selected={data.permissions}
                                    onChange={(newList) => setData('permissions', newList)}
                                    />
                                    {errors.permissions && (
                                        <div className="text-sm text-red-600 mt-1">{errors.permissions}</div>
                                    )}
                                </div>
                            </div>
                            <div className="px-4 py-3 dark:bg-neutral-800 bg-neutral-100 text-right sm:px-6">
                            <Button type="submit" disabled={processing}>
                                Update Role
                            </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </AppLayout>
  )
}
