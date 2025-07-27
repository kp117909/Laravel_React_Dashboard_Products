import { type Product } from '@/types';
import { Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { DollarSign, Star, Tag, CheckCircle, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-lg transition hover:scale-[1.02]">
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      )}

      <CardContent className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex justify-between items-center">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Tag className="w-4 h-4" />
            {product.category.name}
          </Badge>
          <span className={`flex items-center gap-1 text-xs font-medium ${product.is_available ? 'text-green-600' : 'text-red-500'}`}>
            <CheckCircle className="w-4 h-4" />
            {product.is_available ? 'Available' : 'Unavailable'}
          </span>
        </div>

        <h2 className="text-lg font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">{product.name}</h2>

        <div className="flex items-center text-yellow-500 text-sm">
          {'★'.repeat(Math.floor(product.average_rating || 0))}
          {'☆'.repeat(5 - Math.floor(product.average_rating || 0))}
          <span className="ml-2 text-muted-foreground text-xs flex items-center gap-1">
            <Star className="w-3 h-3" /> ({product.reviews_count || 0})
          </span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">{product.description}</p>
      </CardContent>

      <CardFooter className="p-4 flex items-center justify-between">
        <span className="text-xl font-bold flex items-center gap-1">
          <DollarSign className="w-4 h-4" />
          {product.price.toFixed(2)}
        </span>
        <Button size="sm" variant="default" asChild className="flex items-center gap-2">
          <Link href={route('shop.products.show', product.id)}>
            <Eye className="w-4 h-4" />
            View
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
