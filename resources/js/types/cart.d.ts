export interface CartItem {
    id: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        price: number;
        image: string;
    };
}

export interface CartSummary {
    items: CartItem[];
    subtotal: number;
    discount_code?: string;
    discount_amount: number;
    discount_percentage: number;
    total: number;
    item_count: number;
}
