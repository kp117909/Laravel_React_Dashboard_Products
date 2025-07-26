import AppShopLayout from '@/layouts/app/app-navigation-layout';
import { FooterShop } from '@/components/footer2';
import { Product } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, Clock, DollarSign, Star, ShoppingCart, Tag } from 'lucide-react';
import ReturnButton from '@/components/return-button';
import AppLogoIcon from '@/components/app-logo-icon';

interface Props {
  product: Product;
}

export default function ProductPage({ product }: Props) {
  return (
    <AppShopLayout>
      <div className="w-full px-4 py-8 text-[#1b1b18] dark:text-[#EDEDEC]">
        <ReturnButton className='mb-2'/>
        <Card className="overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Product Image */}
            <div className="lg:w-1/2 w-full">
                <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-96 lg:h-full"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between lg:w-1/2 w-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    {product.category.name || 'Category'}
                  </Badge>
                  <span className={`flex items-center gap-1 text-sm font-medium ${product.is_available ? 'text-green-600' : 'text-red-500'}`}>
                    <CheckCircle className="w-4 h-4" />
                    {product.is_available ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <CardTitle className="text-3xl font-bold mt-4 flex items-center gap-2">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-sm flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Added on {new Date(product.created_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 text-lg">
                    {'★'.repeat(Math.floor(product.average_rating || 0))}
                    {'☆'.repeat(5 - Math.floor(product.average_rating || 0))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({product.average_rating?.toFixed(1) || '0.0'})
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {product.reviews_count || 0} reviews
                </p>

                <Separator className="my-4" />

                <ScrollArea className="h-64 pr-4">
                  <p className="text-muted-foreground whitespace-pre-line">
                    {product.description}
                  </p>
                </ScrollArea>
              </CardContent>

              <CardFooter className="flex items-center justify-between">
                <span className="lg:text-2xl font-bold flex items-center">
                 {product.price.toFixed(2)} <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" />

                </span>
               <Button className="flex items-center gap-2 px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base">
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                  Add to Cart
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      </div>
      <FooterShop />
    </AppShopLayout>
  );
}
