import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, useForm } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import { ArrowBigLeft, Key } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FormLayout from '@/layouts/dashboard/form-layout'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Permissions',
    href: '/permissions',
  },
  {
    title: 'Create',
    href: '/permissions/create',
  },
]

type FormData = {
  name: string
}

export default function CreatePermission() {
  const { data, setData, post, processing, errors } = useForm<FormData>({
    name: '',
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('permissions.store'))
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Permission" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Create Permission</h1>

        <Link
          href={route('permissions.index')}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300 mb-6"
        >
          <ArrowBigLeft /> Back
        </Link>

        <FormLayout
          title="Permission Information"
          description="Create a new permission for role-based access control"
          icon={Key}
        >
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-medium">
                Permission Name
              </label>
              <input
                id="name"
                type="text"
                value={data.name}
                onChange={e => setData('name', e.target.value)}
                className="w-full rounded border px-3 py-2"
                placeholder="e.g., users.create, products.edit"
              />
              {errors.name && <div className="text-sm text-red-600 mt-1">{errors.name}</div>}
            </div>

            <Button type="submit" disabled={processing}>
              Create Permission
            </Button>
          </form>
        </FormLayout>
      </div>
    </AppLayout>
  )
}
