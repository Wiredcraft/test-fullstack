import { FETCH_TALKS } from './types';
import api from './api.helper';

export const fetchTalks = () => {
    const payload = api.get('talks?filter[order]=rating DESC');

    return {
        type: FETCH_TALKS,
        payload
    };
};
