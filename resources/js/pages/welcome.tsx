import { Head, Link } from '@inertiajs/react';
import ProductCard from '@/components/product-card';
import {type PaginatedResponse, Product } from '@/types';
import ProductFilters from '@/components/product-filter';
import ShopNav from '@/components/shop-nav';

interface Props {
  products: PaginatedResponse<Product>
}

export default function Welcome({ products }: Props) {
    return (
        <>
            <Head title="Produkty">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <ShopNav />
            <div className="flex min-h-screen w-full bg-[#FDFDFC] p-6 pt-20 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <ProductFilters />
                <main className="flex w-full max-w-4xl flex-col items-center">
                    <h1 className="mb-6 text-2xl font-semibold">See products</h1>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
                        {products && products.data && products.data.length > 0 ? (
                            products.data.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <p className="text-center col-span-3">No product to list.</p>
                        )}
                    </div>
                    <div className="flex justify-center mt-8 gap-2">
                        {products.links && products.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                className={`px-3 py-1 rounded border text-sm ${link.active ? 'bg-[#1b1b18] text-white' : 'bg-white text-[#1b1b18] hover:bg-gray-100'} ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}
