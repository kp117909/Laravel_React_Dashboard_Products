export interface ReviewSubmissionData extends Record<string, unknown> {
    product_id: number;
    order_id: number;
    rating: number;
    comment: string;
}

export interface ReviewSubmissionOptions {
    onStart?: () => void;
    onFinish?: () => void;
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
}
