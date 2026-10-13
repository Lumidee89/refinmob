import api from './axios';

export const getCurrentLiveStream =
    async () => {

        const response =
            await api.get(
                '/livestream/current'
            );

        return response.data;
    };