import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { submitReview } from '@/utils/review-utils';

interface ReviewFormProps {
    productId: number;
    orderId: number;
    productName: string;
    productImage: string;
    hasReviewed: boolean;
}

export function ReviewForm({ productId, orderId, hasReviewed }: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        submitReview(
            {
                product_id: productId,
                order_id: orderId,
                rating,
                comment,
            },
            {
                onStart: () => setIsSubmitting(true),
                onFinish: () => setIsSubmitting(false),
            }
        );
    };

    if (hasReviewed) {
        return (
            <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20">
                <CardContent>
                    <div className="flex items-center space-x-2 text-green-700">
                        <Star className="w-5 h-5 fill-current" />
                        <span className="font-medium">You have already reviewed this product</span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Review this product</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Rating</label>
                        <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className={`p-1 transition-colors ${
                                        star <= rating
                                            ? 'text-yellow-400 hover:text-yellow-500'
                                            : 'text-gray-300 hover:text-gray-400'
                                    }`}
                                >
                                    <Star className="w-6 h-6 fill-current" />
                                </button>
                            ))}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                            {rating === 0 && 'Click to rate'}
                            {rating === 1 && 'Poor'}
                            {rating === 2 && 'Fair'}
                            {rating === 3 && 'Good'}
                            {rating === 4 && 'Very Good'}
                            {rating === 5 && 'Excellent'}
                        </p>
                    </div>

                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium mb-2">
                            Comment (optional)
                        </label>
                        <Textarea
                            id="comment"
                            value={comment}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
                            placeholder="Share your experience with this product..."
                            rows={3}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={rating === 0 || isSubmitting}
                        className="w-full"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
