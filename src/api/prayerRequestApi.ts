import api from './axios';

interface PrayerRequestData {
    name: string;
    phone?: string;
    email?: string;
    prayer_request: string;
}

export const submitPrayerRequest =
    async (
        data: PrayerRequestData
    ) => {

        const response =
            await api.post(
                '/prayer-request',
                data
            );

        return response.data;
    };
