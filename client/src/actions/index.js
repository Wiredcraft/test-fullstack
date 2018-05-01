import { FETCH_NEWS } from "./types";
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchNews = () => {
    const url = `${API_URL}/talks?filter[order]=rating DESC`;
    const payload = axios.get(url);

    return {
        type: FETCH_NEWS,
        payload
    };
};
