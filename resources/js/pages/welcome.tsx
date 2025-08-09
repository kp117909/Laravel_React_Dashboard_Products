import { Link, router } from '@inertiajs/react';
import ProductCard from '@/components/product-card';
import { Category, type PaginatedResponse, Product } from '@/types';
import ProductFilters from '@/components/product-filter';
import AppShopLayout from '@/layouts/app/app-navigation-layout';
import {FooterShop } from '@/components/footer2';
import { useMemo } from 'react';

interface Props {
  products: PaginatedResponse<Product>;
  filters: { years: number[], categories : number[] };
  years: number[];
  categories: Category[];
}

export default function Welcome({ products, categories, filters, years }: Props) {
  const onYearsChange = (next: Set<number>) => {
    router.get(route('home'),
        { years: Array.from(next), categories: Array.from(selectedCategories), page: 1 },
        { preserveState: true, replace: true, only: ['products','filters'] }
    );
  };

  const onCategoriesChange = (next: Set<number>) => {
    router.get(route('home'),
        { years: Array.from(selectedYears), categories: Array.from(next), page: 1 },
        { preserveState: true, replace: true, only: ['products','filters'] }
    );
  }

  const selectedYears = useMemo(
    () => new Set<number>((filters.years ?? []).map(Number)),
    [filters.years]
  );

  const allCategoryIds = useMemo(() => categories.map(c => c.id), [categories]);

  const selectedCategories = useMemo(
    () => new Set<number>((filters.categories?.length ? filters.categories : allCategoryIds).map(Number)),
    [filters.categories, allCategoryIds]
  );

  return (
    <AppShopLayout>
      <div className="flex flex-col lg:flex-row w-full gap-6 text-[#1b1b18] dark:text-[#EDEDEC]">

        <div className="w-full lg:w-72 mb-6 lg:mb-0 shadow-lg rounded-lg bg-white dark:bg-[#18181b]">
          <ProductFilters
            categories={categories}
            products = {products.data}
            years={years}
            onYearsChange={onYearsChange}
            selectedYears={selectedYears}
            onCategoriesChange={onCategoriesChange}
            selectedCategories={selectedCategories}
          />
        </div>

        <main className="flex flex-col items-center w-full">
          <h1 className="mb-6 text-2xl font-semibold">See products</h1>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
            {products?.data?.length ? (
              products.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-center col-span-full">No product to list.</p>
            )}
          </div>


          <div className="flex justify-center mt-8 gap-2">
            {products.links?.map((link, idx) => (
              <Link
                key={idx}
                href={link.url || '#'}
                className={`px-3 py-1 rounded border text-sm ${
                  link.active
                    ? 'bg-[#1b1b18] text-white'
                    : 'bg-white text-[#1b1b18] hover:bg-gray-100'
                } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ))}
          </div>
        </main>
      </div>
      <FooterShop/>
    </AppShopLayout>
  );
}

