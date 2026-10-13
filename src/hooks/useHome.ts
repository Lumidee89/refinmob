import { useQuery } from '@tanstack/react-query';
import { getHomeData } from '../api/homeApi';

export const useHome = () => {

    return useQuery({

        queryKey: ['home'],

        queryFn: getHomeData,

        staleTime: 1000 * 60 * 5,

    });

};