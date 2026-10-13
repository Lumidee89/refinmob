import axios from "axios";

export const serverUrl = (process.env.EXPO_PUBLIC_API_URL || 'http://172.20.10.6:8000/api').replace(/\/$/, '').replace(/\/api$/, '');
export const assetUrl = (path?: string | null) => {
  if (!path) return undefined;
  if (/^https?:\/\//.test(path)) return path;
  return `${serverUrl}/storage/${path.replace(/^\//, '').replace(/^storage\//, '')}`;
};

export default axios.create({
  baseURL: `${serverUrl}/api`,
  timeout: 15000,
  headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
