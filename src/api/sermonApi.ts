import api from './axios';

export const getSermons = async (
    page = 1
) => {

    const response = await api.get(
        `/sermons?page=${page}`
    );

    return response.data;
};

export const getSermon = async (
    id: number
) => {

    const response = await api.get(
        `/sermons/${id}`
    );

    return response.data;
};