import { useQuery } from '@tanstack/react-query';

import {
    getBlogs,
    getBlog,
} from '../api/blogApi';

export const useBlogs = (
    page = 1
) => {

    return useQuery({

        queryKey: ['blogs', page],

        queryFn: () =>
            getBlogs(page),

        staleTime: 1000 * 60 * 5,

    });

};

export const useBlog = (
    slug: string
) => {

    return useQuery({

        queryKey: ['blog', slug],

        queryFn: () =>
            getBlog(slug),

        enabled: !!slug,

    });

};