import ProductCard from '@/components/product-card';
import { Product } from '@/types';
import { ViewMode } from '@/components/view-switcher';

interface ProductListProps {
  products: Product[];
  searchTerm?: string;
  viewMode?: ViewMode;
}

export const ProductList = ({ products, searchTerm, viewMode = 'grid-3' }: ProductListProps) => {
  if (!products.length) {
    return (
      <p className="text-center col-span-full">
        {searchTerm
          ? `No products found for "${searchTerm}".`
          : 'No products to list.'
        }
      </p>
    );
  }

  // For list view, we need to render products differently
  if (viewMode === 'list') {
    return (
      <>
        {products.map((product) => (
          <div key={product.id} className="col-span-full">
            <ProductCard product={product} viewMode="list" />
          </div>
        ))}
      </>
    );
  }

  // For grid view, render normally
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewMode={viewMode} />
      ))}
    </>
  );
};
