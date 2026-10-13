import axios from './axios';

export const getTestimonials = async () => {
    const { data } = await axios.get('/testimonials');

    return data;
};