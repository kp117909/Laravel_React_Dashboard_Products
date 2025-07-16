import AppLayout from '@/layouts/app-layout'
import { Role, type BreadcrumbItem } from '@/types'
import { Head, useForm } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import { ArrowBigLeft } from 'lucide-react'
import { Button } from '@/components/ui/button';
import RoleSelect from '@/components/role-select';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Users Create',
    href: '/users',
  },
  {
    title: 'Create',
    href: '/users/create',
  },
]

type FormData = {
  name: string
  email: string
  password: string
  password_confirmation: string
  role: string;
}

interface Props {
    roles: Role[];
}

export default function Create({roles}: Props) {
  const { data, setData, post, processing, errors } = useForm<FormData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: '',
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(data.role)
    post(route('users.store'))
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users Create" />
      <div className="p-6 space-y-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Create User</h1>
        <Link
          href={route('users.index')}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300 mb-6"
        >
          <ArrowBigLeft /> Back
        </Link>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium">
              Name
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
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              className="w-full rounded border px-3 py-2"

            />
            {errors.email && <div className="text-sm text-red-600 mt-1">{errors.email}</div>}
          </div>

          <div>
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={data.password}
              onChange={e => setData('password', e.target.value)}
              className="w-full rounded border px-3 py-2"

            />
            {errors.password && <div className="text-sm text-red-600 mt-1">{errors.password}</div>}
          </div>

          <div>
            <label htmlFor="password_confirmation" className="block font-medium">
              Confirm Password
            </label>
            <input
              id="password_confirmation"
              type="password"
              value={data.password_confirmation}
              onChange={e => setData('password_confirmation', e.target.value)}
              className="w-full rounded border px-3 py-2"

            />
            {errors.password_confirmation && (
              <div className="text-sm text-red-600 mt-1">{errors.password_confirmation}</div>
            )}
          </div>

          <div>
            <label htmlFor="password_confirmation" className="block font-medium">
             Choose Role
            </label>

            <RoleSelect
                roles={roles}
                value={data.role}
                onChange={(value) => setData('role', value)}
                error={errors.role}
            />
          </div>

          <Button
            type="submit"
            disabled={processing}
          >
            Create new user
          </Button>
        </form>
      </div>
    </AppLayout>
  )
}
