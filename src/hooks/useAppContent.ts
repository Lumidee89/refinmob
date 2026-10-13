import { useQuery } from '@tanstack/react-query';
import { getAppContent } from '../api/appContentApi';
import { AppSection } from '../types/appContent';

export const useAppContent = (section?: AppSection) => useQuery({
    queryKey: ['app-content', section],
    queryFn: () => getAppContent(section),
    staleTime: 1000 * 60 * 5,
});
