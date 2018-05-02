import { FETCH_NEWS } from './types';
import api from './api.helper';

export const fetchNews = () => {
    const payload = api.get('talks?filter[order]=rating DESC');

    return {
        type: FETCH_NEWS,
        payload
    };
};
