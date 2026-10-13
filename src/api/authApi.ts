import api from './axios';
export interface MobileUser { id: number; name: string; email: string; phone?: string }
export interface AuthResponse { user: MobileUser; token: string }
export const login = async (data: { email: string; password: string }): Promise<AuthResponse> => (await api.post('/auth/login', data)).data;
export const register = async (data: { name: string; email: string; phone: string; password: string; password_confirmation: string }): Promise<AuthResponse> => (await api.post('/auth/register', data)).data;
export const getMe = async (): Promise<MobileUser> => (await api.get('/auth/me')).data.user;
export const logout = async () => api.post('/auth/logout');
