import api from './axios';
export type ConnectRequestType = 'salvation' | 'membership' | 'speak-to-a-pastor' | 'join-a-team';
export const submitConnectRequest = async (data: { type: ConnectRequestType; name: string; phone: string; email?: string; message?: string }) => (await api.post('/connect-requests', data)).data;
