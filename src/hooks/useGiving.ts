import { useQuery } from '@tanstack/react-query';
import { getGivingAccounts } from '../api/givingApi';
export const useGiving = () => useQuery({ queryKey: ['giving-accounts'], queryFn: getGivingAccounts, staleTime: 300000 });
