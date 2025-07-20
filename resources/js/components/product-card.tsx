import { type Product } from '@/types';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden dark:bg-[#18181b] dark:border-[#232323] transition hover:scale-[1.03] hover:shadow-xl">
            {product.image && (
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
            )}
            <div className="p-4 flex flex-col flex-1">
                <h2 className="text-lg font-bold mb-2 text-[#1b1b18] dark:text-[#EDEDEC]">{product.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">{product.price} zł</span>
                    <button className="px-4 py-1.5 bg-[#1b1b18] text-white rounded hover:bg-[#232323] transition text-sm dark:bg-[#EDEDEC] dark:text-[#18181b] dark:hover:bg-[#cfcfcf]">
                        View
                    </button>
                </div>
            </div>
        </div>
    );
}
