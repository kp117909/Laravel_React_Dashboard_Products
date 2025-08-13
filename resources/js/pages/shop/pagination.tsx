import { Link } from '@inertiajs/react';
import { PaginatedResponse, Product } from '@/types';

interface PaginationProps {
  products: PaginatedResponse<Product>;
}

export const Pagination = ({ products }: PaginationProps) => {
  return (
    <div className="flex flex-col items-center mt-8 gap-4 pb-16 lg:pb-8">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing {products.from || 0} to {products.to || 0} of {products.total || 0} products
      </div>

      <div className="flex flex-wrap justify-center gap-2 px-4">
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
    </div>
  );
};
