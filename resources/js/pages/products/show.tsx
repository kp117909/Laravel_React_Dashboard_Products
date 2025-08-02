import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import { Product } from '@/types';
import { BookMinus, BookPlus, PackageCheck, PackageMinus, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useBackToListUrl } from '@/utils/data-table';
import BackToListButton from '@/components/back-to-list-button';

interface ShowProductProps {
  product: Product;
}

const breadcrumbs = (backToListUrl: string): BreadcrumbItem[] => [
  {
    title: 'Products List',
    href: backToListUrl,
  },
  {
    title: 'View',
    href: '/product/show',
  },
];

export default function ShowProduct({ product }: ShowProductProps) {
  const backToListUrl = useBackToListUrl('products.index');
  return (
    <AppLayout breadcrumbs={breadcrumbs(backToListUrl)}>
      <Head title={`Product view: ${product.name}`} />

      <div className="p-6 space-y-6">

        <BackToListButton
            title="Product Details"
            backHref={backToListUrl}
            backLabel="Return to product list"
        />

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
                    <Badge  variant="outline">{product.category.name}</Badge>
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
                    <h4 className="text-muted-foreground font-medium">Published</h4>
                    <Badge variant={product.is_published ? 'default' : 'outline'}>
                    {product.is_published ? (
                        <><BookPlus className="inline mr-1" /> Published</>
                    ) : (
                        <><BookMinus className="inline mr-1" /> Not Published</>
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
            <Separator className="my-4" />
            <CardFooter className="flex flex-col items-start text-xs text-muted-foreground space-y-1">
                <p><strong>Created at:</strong> {new Date(product.created_at).toLocaleString()}</p>
                <p><strong>Updated at:</strong> {new Date(product.updated_at).toLocaleString()}</p>
            </CardFooter>
        </Card>

      </div>
    </AppLayout>
  );
}
