import { Link } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';

export function CartIcon() {
    const { itemCount } = useCart();

    return (
        <Button asChild variant="ghost" size="icon" className="relative">
            <Link href={route('cart.index')}>
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                    <Badge
                        variant="secondary"
                        className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                        {itemCount}
                    </Badge>
                )}
            </Link>
        </Button>
    );
}
