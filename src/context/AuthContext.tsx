import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../api/axios';
import { AuthResponse, getMe, login as apiLogin, logout as apiLogout, MobileUser, register as apiRegister } from '../api/authApi';

const TOKEN_KEY = 'church_mobile_token';
interface AuthContextValue { user: MobileUser | null; loading: boolean; login: (email: string, password: string) => Promise<void>; register: (data: any) => Promise<void>; logout: () => Promise<void> }
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<MobileUser | null>(null); const [loading, setLoading] = useState(true);
    const persist = async (response: AuthResponse) => { await SecureStore.setItemAsync(TOKEN_KEY, response.token); setUser(response.user); };
    useEffect(() => { const request = api.interceptors.request.use(async config => { const token = await SecureStore.getItemAsync(TOKEN_KEY); if (token) config.headers.Authorization = `Bearer ${token}`; return config; }); (async () => { try { const token = await SecureStore.getItemAsync(TOKEN_KEY); if (token) setUser(await getMe()); } catch { await SecureStore.deleteItemAsync(TOKEN_KEY); } finally { setLoading(false); } })(); return () => api.interceptors.request.eject(request); }, []);
    return <AuthContext.Provider value={{ user, loading, login: async (email, password) => persist(await apiLogin({ email, password })), register: async data => persist(await apiRegister(data)), logout: async () => { try { await apiLogout(); } finally { await SecureStore.deleteItemAsync(TOKEN_KEY); setUser(null); } } }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => { const value = useContext(AuthContext); if (!value) throw new Error('useAuth must be inside AuthProvider'); return value; };
