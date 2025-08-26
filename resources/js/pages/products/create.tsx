import AppLayout from '@/layouts/app-layout'
import { Head, useForm } from '@inertiajs/react'
import { Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { BreadcrumbItem } from '@/types'
import { InputFile } from '@/components/input-file'
import { Category } from '@/types'
import CategorySelect from '@/components/category-select'
import { CheckboxProduct } from '@/components/checkbox-product'
import FormLayout from '@/layouts/dashboard/form-layout'
import { useBackToListUrl } from '@/utils/data-table'
import BackToListButton from '@/components/back-to-list-button'
const breadcrumbs = (backToListUrl: string): BreadcrumbItem[] => [
  {
    title: 'Products List',
    href: backToListUrl,
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
  category_id: number | string
  is_available: boolean
  is_published: boolean
  image: File | null
}

type Props = {
    categories: Category[]
}

export default function CreateProduct({categories}: Props) {
  const backToListUrl = useBackToListUrl('products.index');
  const { data, setData, post, processing, errors } = useForm<FormData>({
    name: '',
    description: '',
    price: '',
    category_id: '',
    is_available: false,
    is_published: false,
    image: null,
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('products.store'))
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs(backToListUrl)}>
      <Head title="Create Product" />

      <div className="p-6 space-y-6">
        <BackToListButton
            title="Craete Product"
            backHref={backToListUrl}
            backLabel="Return to product list"
        />
        <FormLayout title="Product information" description="Create a new product" icon={Package}>
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

           <div>
                <label htmlFor="category_select" className="block font-medium">
                Category Select
                </label>

                <CategorySelect
                    categories={categories}
                    value={data.category_id}
                    onChange={(value) => setData('category_id', value)}
                    error={errors.category_id}
                />
            </div>



          <InputFile onFileSelect={(file) => setData('image', file)} />

          <CheckboxProduct
            label = 'Product available'
            description = 'Not checked means product will be visible on dashboard but buying will be blocked.'
            checked={data.is_available}
            onChange={(val) => setData('is_available', val)}
           />

           <CheckboxProduct
            label = 'Product published'
            description = 'Not checked means product will not be visible on dashboard.'
            checked={data.is_published}
            onChange={(val) => setData('is_published', val)}
           />
          <Button type="submit" disabled={processing}>
            Create Product
          </Button>
        </form>
        </FormLayout>
      </div>
    </AppLayout>
  )
}
