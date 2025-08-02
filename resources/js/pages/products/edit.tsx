import AppLayout from '@/layouts/app-layout'
import { Inertia, type Method } from '@inertiajs/inertia'
import { PackageSearch } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { BreadcrumbItem, Product, Category } from '@/types'
import { InputFile } from '@/components/input-file'
import CategorySelect from '@/components/category-select'
import { CheckboxProduct } from '@/components/checkbox-product'
import { useState } from 'react'
import { buildFormData } from '@/utils/form'
import FormLayout from '@/layouts/dashboard/form-layout'
import { useBackToListUrl } from '@/utils/data-table'
import BackToListButton from '@/components/back-to-list-button'
import { Head } from '@inertiajs/react'

const breadcrumbs = (backToListUrl: string): BreadcrumbItem[] => [
  {
    title: 'Products List',
    href: backToListUrl,
  },
  {
    title: 'Edit',
    href: '/products/edit',
  },
]

type Props = {
  product: Product
  categories: Category
}
const EditProduct = ({ product, categories }: Props) => {
  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    price: String(product.price),
    category_id: product.category?.id ?? '',
    is_available: !!product.is_available,
    is_published: !!product.is_published,
    image: null as File | null,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [processing, setProcessing] = useState(false)
  const backToListUrl = useBackToListUrl('products.index')
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)
    setErrors({})

    const formData = buildFormData({
      ...form,
      _method: 'PUT',
    })

    Inertia.visit(route('products.update', product.id), {
      method: 'post' as Method,
      data: formData,
      forceFormData: true,
      onError: (errors) => setErrors(errors),
      onFinish: () => setProcessing(false),
    })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs(backToListUrl)}>
      <Head title="Edit Product" />
      <div className="p-6 space-y-6">
        <BackToListButton
            title="Edit Product"
            backHref={backToListUrl}
            backLabel="Return to product list"
        />
        <FormLayout title="Product information" description="Edit the product details" icon={PackageSearch}>
            <form onSubmit={submit} className="space-y-4">
                <div>
                <label htmlFor="name" className="block font-medium">Name</label>
                <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded border px-3 py-2"
                />
                {errors.name && <div className="text-sm text-red-600 mt-1">{errors.name}</div>}
                </div>

                <div>
                <label htmlFor="description" className="block font-medium">Description</label>
                <textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
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
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full rounded border px-3 py-2"
                />
                {errors.price && <div className="text-sm text-red-600 mt-1">{errors.price}</div>}
                </div>

                <div>
                <label className="block font-medium">Category</label>
                <CategorySelect
                    categories={categories}
                    value={form.category_id}
                    onChange={(value) => setForm({ ...form, category_id: value })}
                    error={errors.category_id}
                />
                </div>

                {product.image && (
                <div>
                    <label className="block font-medium mb-1">Current Image</label>
                    <img
                    src={`${product.image}`}
                    alt={form.name}
                    className="w-40 h-auto rounded border mb-2"
                    />
                </div>
                )}
                <InputFile
                onFileSelect={(file) => setForm({ ...form, image: file })}
                />
                {errors.image && (<div className="text-sm text-red-600 mt-1">{errors.image}</div>)}

                <CheckboxProduct
                label="Product available"
                description="Not checked means product will be visible on dashboard but buying will be blocked."
                checked={form.is_available}
                onChange={(val) => setForm({ ...form, is_available: val })}
                />

                <CheckboxProduct
                label="Product published"
                description="Not checked means product will not be visible on dashboard."
                checked={form.is_published}
                onChange={(val) => setForm({ ...form, is_published: val })}
                />

                <Button type="submit" disabled={processing}>
                Update Product
                </Button>
            </form>
        </FormLayout>
      </div>
    </AppLayout>
  )
}

export default EditProduct

