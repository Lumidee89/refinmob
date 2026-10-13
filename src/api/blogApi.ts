import api from './axios';

export const getBlogs = async (
    page = 1
) => {

    const response = await api.get(
        `/blogs?page=${page}`
    );

    return response.data;
};

export const getBlog = async (
    slug: string
) => {

    const response = await api.get(
        `/blogs/${slug}`
    );

    return response.data;
};