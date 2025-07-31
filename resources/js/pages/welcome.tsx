import { Link } from '@inertiajs/react';
import ProductCard from '@/components/product-card';
import { type PaginatedResponse, Product } from '@/types';
import ProductFilters from '@/components/product-filter';
import AppShopLayout from '@/layouts/app/app-navigation-layout';
import {FooterShop } from '@/components/footer2';

interface Props {
  products: PaginatedResponse<Product>;
}


export default function Welcome({ products }: Props) {
  return (
    <AppShopLayout>
      <div className="flex flex-col lg:flex-row w-full gap-6 text-[#1b1b18] dark:text-[#EDEDEC]">


        <div className="w-full lg:w-72 mb-6 lg:mb-0 shadow-lg rounded-lg bg-white dark:bg-[#18181b]">
          <ProductFilters />
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
