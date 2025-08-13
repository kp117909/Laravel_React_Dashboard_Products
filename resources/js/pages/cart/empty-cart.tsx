import { ShoppingBag } from 'lucide-react';

export function EmptyCart() {
    return (
        <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-4">Add some items to your cart to continue shopping</p>
        </div>
    );
}
