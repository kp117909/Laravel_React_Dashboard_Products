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
    total: number;
    item_count: number;
}
