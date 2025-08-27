import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
    item: CartItemType;
    isLoading: boolean;
    onUpdateQuantity: (itemId: number, quantity: number) => void;
    onRemove: (itemId: number) => void;
}

export function CartItem({ item, isLoading, onUpdateQuantity, onRemove }: CartItemProps) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 border-b last:border-0">
            <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-gray-500">
                    ${item.product.price.toFixed(2)}
                </p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <div className="flex items-center border rounded-md">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={isLoading || item.quantity <= 1}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-16 h-8 text-center border-0"
                        disabled={isLoading}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={isLoading}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemove(item.id)}
                    disabled={isLoading}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
