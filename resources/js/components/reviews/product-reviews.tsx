import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, User } from 'lucide-react';
import { Review } from '@/types';

interface ProductReviewsProps {
    reviews: Review[];
    averageRating: number;
    reviewsCount: number;
}

export function ProductReviews({ reviews, averageRating, reviewsCount }: ProductReviewsProps) {
    if (reviewsCount === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Star className="w-5 h-5" />
                        Reviews
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-center py-8">
                        No reviews yet. Be the first to review this product!
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Reviews ({reviewsCount})
                </CardTitle>
                <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                        {'★'.repeat(Math.floor(averageRating))}
                        {'☆'.repeat(5 - Math.floor(averageRating))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                        {averageRating.toFixed(1)} out of 5
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-4 last:border-b-0">
                            <div className="flex items-start gap-3">
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback>
                                        <User className="w-4 h-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium text-sm">
                                            {review.user.name}
                                        </span>
                                        <Badge variant="outline" className="text-xs">
                                            {new Date(review.created_at).toLocaleDateString()}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        <div className="flex text-yellow-400 text-sm">
                                            {'★'.repeat(review.rating)}
                                            {'☆'.repeat(5 - review.rating)}
                                        </div>
                                    </div>
                                    {review.comment && (
                                        <p className="text-sm text-muted-foreground">
                                            {review.comment}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
