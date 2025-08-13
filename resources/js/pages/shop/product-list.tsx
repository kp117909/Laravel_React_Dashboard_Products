import ProductCard from '@/components/product-card';
import { Product } from '@/types';

interface ProductListProps {
  products: Product[];
  searchTerm?: string;
}

export const ProductList = ({ products, searchTerm }: ProductListProps) => {
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

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
};
