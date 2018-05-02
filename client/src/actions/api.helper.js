import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export default {
    get(endpoint) {
        const url = `${API_URL}/${endpoint}`;
        return axios.get(url);
    },
    post(endpoint, value) {
        const url = `${API_URL}/${endpoint}`;
        return axios.post(url, value);
    }
};
