import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { Product } from '@/types';
import { ArrowBigLeft, PackageCheck, PackageMinus, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface ShowProductProps {
  product: Product;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Product View',
    href: '/product',
  },
  {
    title: 'View',
    href: '/product/show',
  },
];

export default function ShowProduct({ product }: ShowProductProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Product: ${product.name}`} />

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Product Details</h1>
          <Button asChild variant="outline">
            <Link href={route('products.index')} className="gap-2">
              <ArrowBigLeft className="h-5 w-5" /> Return to product list
            </Link>
          </Button>
        </div>

        <Card className="shadow-md">
  <CardHeader>
    <CardTitle className="text-2xl font-semibold">Product: {product.name}</CardTitle>
  </CardHeader>

  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
    <div className="md:col-span-2 space-y-4">
      <div>
        <h4 className="text-muted-foreground font-medium">ID</h4>
        <p>{product.id}</p>
      </div>
      <div>
        <h4 className="text-muted-foreground font-medium">Category</h4>
        <div className="flex flex-wrap gap-2">
          {product.category?.map((cat, i) => (
            <Badge key={i} variant="outline">{cat.name}</Badge>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-muted-foreground font-medium">Description</h4>
        <p>{product.description}</p>
      </div>
      <div>
        <h4 className="text-muted-foreground font-medium">Price</h4>
        <Badge variant="secondary">{product.price} zł</Badge>
      </div>
      <div>
        <h4 className="text-muted-foreground font-medium">Availability</h4>
        <Badge variant={product.is_available ? 'outline' : 'destructive'}>
          {product.is_available ? (
            <><PackageCheck className="inline mr-1" /> Available</>
          ) : (
            <><PackageMinus className="inline mr-1" /> Unavailable</>
          )}
        </Badge>
      </div>
      <div>
        <h4 className="text-muted-foreground font-medium">Average Rating</h4>
        <Badge variant="outline">
          {product.average_rating ? (
            <>{product.average_rating.toFixed(1)} <Star className="inline w-4 h-4 ml-1" /></>
          ) : (
            'No ratings'
          )}
        </Badge>
      </div>
      <div>
        <h4 className="text-muted-foreground font-medium">Review Count</h4>
        <p>{product.reviews_count ?? 0}</p>
      </div>
    </div>

    {product.image && (
      <div className="flex justify-center items-start">
       <img
        src={product.image}
        alt={product.name}
        className="w-full max-w-sm rounded-md shadow-md"
        />
       </div>
    )}
  </CardContent>

  <CardFooter className="flex flex-col items-start text-xs text-muted-foreground space-y-1">
    <p><strong>Created at:</strong> {new Date(product.created_at).toLocaleString()}</p>
    <p><strong>Updated at:</strong> {new Date(product.updated_at).toLocaleString()}</p>
  </CardFooter>
</Card>

      </div>
    </AppLayout>
  );
}
