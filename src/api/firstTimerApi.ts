import api from './axios';

interface FirstTimerData {
    full_name: string;
    phone: string;
    email?: string;
    address?: string;
    occupation?: string;
    prayer_request?: string;
}

export const submitFirstTimer =
    async (
        data: FirstTimerData
    ) => {

        const response =
            await api.post(
                '/first-timer',
                data
            );

        return response.data;
    };