import AppShopLayout from '@/layouts/app/app-navigation-layout';
import { Product } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Tag, Edit } from 'lucide-react';
import { AddToCartButton } from '@/components/add-to-cart-button';
import  ReturnButton from '@/components/return-button';
import { ProductReviews } from '@/components/reviews/product-reviews';
import { useCan } from '@/lib/can';
import { Link } from '@inertiajs/react';

interface Props {
  product: Product;
}

export default function ProductPage({ product }: Props) {
  const canEditProducts = useCan('products.edit');

  return (
    <AppShopLayout
      onSearch={(searchTerm) => {
        window.location.href = `/?search=${encodeURIComponent(searchTerm)}`;
      }}
    >
      <div className="min-h-screen bg-gradient-to-br dark:bg-dark">
        <div className="container mx-auto px-4 py-8">
          <ReturnButton
            className='mb-6'
            label="Back to Shop"
            useSavedFilters={true}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Product Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src={`${product.image}`}
                  alt={product.name}
                  className="w-full h-[500px] object-cover rounded-2xl shadow-2xl border-1 border-gray-800 dark:border-secondary transition-transform group-hover:scale-[1.02]"
                />
              </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                 <Badge variant="secondary" className="flex items-center gap-1">
                    <Tag className="w-4 h-4 mr-1" />
                    {product.category.name || 'Category'}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {product.is_available ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400 text-xl">
                      {'★'.repeat(Math.floor(product.average_rating || 0))}
                      {'☆'.repeat(5 - Math.floor(product.average_rating || 0))}
                    </div>
                    <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                      {product.average_rating?.toFixed(1) || '0.0'}
                    </span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">
                    ({product.reviews_count || 0} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                   <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                     {product.price.toFixed(2)} zł
                   </span>
                 </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Description</h3>
                <div className="bg-white dark:bg-secondary rounded-xl p-6 shadow-sm">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="pt-4 space-y-3">
                <AddToCartButton
                  productId={product.id}
                  isAvailable={product.is_available}
                  className="w-full py-4 text-lg font-semibold bg-gradient-to-r bg-primary text-primary-foreground
                   text-white dark:text-secondary rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                />

                {/* Edit Button - Only show if user has edit permission */}
                {canEditProducts && (
                  <Link href={`/products/${product.id}/edit`}>
                    <Button
                      variant="outline"
                      className="w-full py-4 text-lg font-semibold border-2 border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white transition-all"
                    >
                      <Edit className="w-5 h-5 mr-2" />
                      Edit Product
                    </Button>
                  </Link>
                )}
              </div>

              {/* Product Meta */}
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Added {new Date(product.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-secondary overflow-hidden">
            <ProductReviews
              reviews={product.reviews || []}
              averageRating={product.average_rating || 0}
              reviewsCount={product.reviews_count || 0}
            />
          </div>
        </div>
      </div>
    </AppShopLayout>
  );
}
