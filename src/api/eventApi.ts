import api from './axios';

export const getEvents = async (
    page = 1
) => {

    const response = await api.get(
        `/events?page=${page}`
    );

    return response.data;
};

export const getEvent = async (
    slug: string
) => {

    const response = await api.get(
        `/events/${slug}`
    );

    return response.data;
};