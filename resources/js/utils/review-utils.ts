import { router } from '@inertiajs/react';
import type { ReviewSubmissionData, ReviewSubmissionOptions } from '@/types/review';

export const submitReview = (
    data: ReviewSubmissionData,
    options: ReviewSubmissionOptions = {}
) => {
    const { onStart, onFinish, onSuccess, onError } = options;

    if (onStart) onStart();

    router.post(route('reviews.store'), data as unknown as FormData, {
        onSuccess: () => {
            if (onSuccess) onSuccess();
        },
        onError: (errors) => {
            if (onError) onError(errors);
        },
        onFinish: () => {
            if (onFinish) onFinish();
        },
    });
};
