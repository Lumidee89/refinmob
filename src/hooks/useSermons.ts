import { useQuery } from '@tanstack/react-query';
import {
    getSermons,
    getSermon,
} from '../api/sermonApi';

export const useSermons = (
    page = 1
) => {

    return useQuery({

        queryKey: ['sermons', page],

        queryFn: () =>
            getSermons(page),

        staleTime: 1000 * 60 * 5,

    });

};

export const useSermon = (
    id: number
) => {

    return useQuery({

        queryKey: ['sermon', id],

        queryFn: () =>
            getSermon(id),

        enabled: !!id,

    });

};