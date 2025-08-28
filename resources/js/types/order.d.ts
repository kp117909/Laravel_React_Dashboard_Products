export interface OrderItem {
    id: number;
    product_id: number;
    quantity: number;
    price: number;
    product: {
        id: number;
        name: string;
        price: number;
        image: string;
    };
}

export interface Order {
    id: number;
    user_id: number;
    cart_id: number;
    total: number;
    status: string;
    created_at: string;
    items: OrderItem[];
    reviewed_products?: number[];
    cart?: {
        discount_code?: string;
        discount_amount?: number;
        subtotal?: number;
    };
}
