import AppLayout from '@/layouts/app-layout'
import { Permission, type BreadcrumbItem } from '@/types'
import { Head, useForm } from '@inertiajs/react'
import { Key } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FormLayout from '@/layouts/dashboard/form-layout'
import { useBackToListUrl } from '@/utils/data-table'
import BackToListButton from '@/components/back-to-list-button'

const breadcrumbs = (backToListUrl: string): BreadcrumbItem[] => [
  {
    title: 'Permissions',
    href: backToListUrl,
  },
  {
    title: 'Edit',
    href: '/permissions/edit',
  },
]

type FormData = {
  name: string
}

type Props = {
  permission: Permission
}

export default function EditPermission({ permission }: Props) {
  const backToListUrl = useBackToListUrl('permissions.index')

  const { data, setData, put, processing, errors } = useForm<FormData>({
    name: permission.name,
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    put(route('permissions.update', permission.id))
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs(backToListUrl)}>
      <Head title="Edit Permission" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Edit Permission</h1>

        <BackToListButton title="Edit Permission" backHref={backToListUrl} backLabel="Return to permission list" />

        <FormLayout
          title="Permission Information"
          description="Update permission details"
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
              Update Permission
            </Button>
          </form>
        </FormLayout>
      </div>
    </AppLayout>
  )
}
