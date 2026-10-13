import api from './axios';
import { AppContentResponse, AppSection } from '../types/appContent';

export const getAppContent = async (section?: AppSection): Promise<AppContentResponse> => {
    const response = await api.get('/app-content', { params: section ? { section } : undefined });
    return response.data;
};
