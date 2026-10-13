import api from './axios';
export interface GivingAccount { id: number; category: string; title: string; bank_name: string; account_name: string; account_number: string; payment_url?: string | null }
export const getGivingAccounts = async (): Promise<GivingAccount[]> => (await api.get('/giving-accounts')).data;
