import AppLayout from '@/layouts/app-layout'
import { Head, useForm } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import { ArrowBigLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { BreadcrumbItem } from '@/types'
import { InputFile } from '@/components/input-file'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Products',
    href: '/products',
  },
  {
    title: 'Create',
    href: '/products/create',
  },
]

type FormData = {
  name: string
  description: string
  price: string
  image: File | null
}

export default function CreateProduct() {
  const { data, setData, post, processing, errors } = useForm<FormData>({
    name: '',
    description: '',
    price: '',
    image: null,
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('price', data.price)
    if (data.image) formData.append('image', data.image)

    post(route('products.store'), {
      data: formData,
      forceFormData: true,
    })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Product" />

      <div className="p-6 space-y-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Create Product</h1>

        <Link
          href={route('products.index')}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300 mb-6"
        >
          <ArrowBigLeft /> Back
        </Link>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium">Name</label>
            <input
              id="name"
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="w-full rounded border px-3 py-2"
            />
            {errors.name && <div className="text-sm text-red-600 mt-1">{errors.name}</div>}
          </div>

          <div>
            <label htmlFor="description" className="block font-medium">Description</label>
            <textarea
              id="description"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              className="w-full rounded border px-3 py-2"
            />
            {errors.description && <div className="text-sm text-red-600 mt-1">{errors.description}</div>}
          </div>

          <div>
            <label htmlFor="price" className="block font-medium">Price</label>
            <input
              id="price"
              type="number"
              step="0.01"
              value={data.price}
              onChange={(e) => setData('price', e.target.value)}
              className="w-full rounded border px-3 py-2"
            />
            {errors.price && <div className="text-sm text-red-600 mt-1">{errors.price}</div>}
          </div>

          <InputFile onFileSelect={(file) => setData('image', file)} />

          <Button type="submit" disabled={processing}>
            Create Product
          </Button>
        </form>
      </div>
    </AppLayout>
  )
}
