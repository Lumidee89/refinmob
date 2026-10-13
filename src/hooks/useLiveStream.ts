import { useQuery } from '@tanstack/react-query';

import {
    getCurrentLiveStream,
} from '../api/livestreamApi';

export const useLiveStream = () => {

    return useQuery({

        queryKey: ['livestream'],

        queryFn: getCurrentLiveStream,

        refetchInterval: 30000,

        staleTime: 1000 * 60,

    });

};