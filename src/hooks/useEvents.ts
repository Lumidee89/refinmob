import { useQuery } from '@tanstack/react-query';

import {
    getEvents,
    getEvent,
} from '../api/eventApi';

export const useEvents = (
    page = 1
) => {

    return useQuery({

        queryKey: ['events', page],

        queryFn: () =>
            getEvents(page),

        staleTime: 1000 * 60 * 5,

    });

};

export const useEvent = (
    slug: string
) => {

    return useQuery({

        queryKey: ['event', slug],

        queryFn: () =>
            getEvent(slug),

        enabled: !!slug,

    });

};