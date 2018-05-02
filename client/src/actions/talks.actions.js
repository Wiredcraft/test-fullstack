import { FETCH_TALKS, CREATE_TALK } from './types';
import api from './api.helper';

export const fetchTalks = () => {
    const payload = api.get('talks?filter[order]=rating DESC');

    return {
        type: FETCH_TALKS,
        payload
    };
};

export const createTalk = (talk, callback) => {
    const response = api.post('talks', talk).then(callback());

    return {
        type: CREATE_TALK,
        payload: response
    }
};
