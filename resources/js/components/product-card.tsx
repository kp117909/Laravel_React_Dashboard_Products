import { type Product } from '@/types';
import { Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Star, Tag, CheckCircle, Eye } from 'lucide-react';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { ViewMode } from '@/components/view-switcher';

interface ProductCardProps {
  product: Product;
  viewMode?: ViewMode;
}

// Product Image Component
function ProductImage({ product }: { product: Product }) {
  if (!product.image) return null;

  const imageUrl = typeof product.image === 'string'
    ? product.image
    : URL.createObjectURL(product.image);

  return (
    <div className="flex justify-center py-4">
      <div className="w-60 h-70 rounded-xl overflow-hidden border-4 border-gray-200 dark:border-gray-700">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

// Product Image for List View
function ProductImageList({ product }: { product: Product }) {
  if (!product.image) return null;

  const imageUrl = typeof product.image === 'string'
    ? product.image
    : URL.createObjectURL(product.image);

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-60 h-70 rounded-xl overflow-hidden border-4 border-gray-200 dark:border-gray-700">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

// Product Header Component (Category + Availability)
function ProductHeader({ product }: { product: Product }) {
  return (
    <div className="flex flex-col 2xl:flex-row justify-between items-start 2xl:items-center gap-2">
      <Badge variant="secondary" className="flex items-center gap-1">
        <Tag className="w-4 h-4" />
        {product.category.name}
      </Badge>
      <span className={`flex items-center gap-1 text-xs font-medium ${product.is_available ? 'text-green-600' : 'text-red-500'}`}>
        <CheckCircle className="w-4 h-4" />
        {product.is_available ? 'Available' : 'Unavailable'}
      </span>
    </div>
  );
}

// Product Rating Component
function ProductRating({ product }: { product: Product }) {
  const rating = Math.floor(product.average_rating || 0);
  const reviewsCount = product.reviews_count || 0;

  return (
    <div className="flex items-center text-yellow-500 text-sm">
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
      <span className="ml-2 text-muted-foreground text-xs flex items-center gap-1">
        <Star className="w-3 h-3" /> ({reviewsCount})
      </span>
    </div>
  );
}

// Product Price Component
function ProductPrice({ product }: { product: Product }) {
  return (
    <div className="flex justify-center">
      <span className="text-xl font-bold flex items-center gap-1">
        {product.price.toFixed(2)} zł
      </span>
    </div>
  );
}

// Product Actions Component
function ProductActions({ product }: { product: Product }) {
  return (
    <div className="flex w-full 2xl:w-auto gap-3 justify-center lg:flex-col xl:flex-row">
      <Button size="lg" variant="outline" asChild className="flex-1 2xl:flex-none flex items-center justify-center px-6 py-3">
        <Link href={route('shop.products.show', product.id)}>
          <Eye className="w-5 h-5 mr-2" />
          View
        </Link>
      </Button>
      <AddToCartButton
        productId={product.id}
        isAvailable={product.is_available}
        showQuantity={false}
        variant="default"
        className="flex-1 2xl:flex-none flex items-center justify-center gap-2 px-6 py-3 text-base"
      />
    </div>
  );
}

// Product Actions for List View
function ProductActionsList({ product }: { product: Product }) {
  return (
    <div className="flex gap-3">
      <Button size="lg" variant="outline" asChild className="px-5 py-2">
        <Link href={route('shop.products.show', product.id)}>
          <Eye className="w-5 h-5 mr-2" />
          View
        </Link>
      </Button>
      <AddToCartButton
        productId={product.id}
        isAvailable={product.is_available}
        showQuantity={false}
        variant="default"
        className="flex items-center justify-center gap-2 px-5 py-2 text-base"
      />
    </div>
  );
}

// Grid View Layout
function ProductCardGrid({ product }: { product: Product }) {
  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-lg transition hover:scale-[1.02] text-center">
      <ProductImage product={product} />

      <CardContent className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex justify-center">
          <ProductHeader product={product} />
        </div>
        <h2 className="text-xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC] line-clamp-2">{product.name}</h2>
        <div className="flex justify-center">
          <ProductRating product={product} />
        </div>
        <ProductPrice product={product} />
        <p className="text-sm text-muted-foreground line-clamp-3 text-center">{product.description}</p>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex justify-center">
        <ProductActions product={product} />
      </CardFooter>
    </Card>
  );
}

// List View Layout
function ProductCardList({ product }: { product: Product }) {
  return (
    <Card className="flex flex-row overflow-hidden hover:shadow-lg transition hover:scale-[1.01] items-center">
      <ProductImageList product={product} />

      <div className="flex flex-1 flex-col py-4">
        <CardContent className="p-4 flex flex-col gap-3 flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#1b1b18] dark:text-[#EDEDEC] flex-1">{product.name}</h2>
            <ProductPrice product={product} />
          </div>
          <div className="flex items-center gap-4">
            <ProductHeader product={product} />
            <ProductRating product={product} />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          <div className="flex justify-end mt-2">
            <ProductActionsList product={product} />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

// Main Product Card Component
export default function ProductCard({ product, viewMode = 'grid-3' }: ProductCardProps) {
  return viewMode === 'list'
    ? <ProductCardList product={product} />
    : <ProductCardGrid product={product} />;
}
