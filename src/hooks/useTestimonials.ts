import { useQuery } from '@tanstack/react-query';

import { getTestimonials } from '../api/testimonialApi';

export const useTestimonials = () => {
    return useQuery({
        queryKey: ['testimonials'],
        queryFn: getTestimonials,
    });
};