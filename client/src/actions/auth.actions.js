import { LOGIN, LOGOUT, CHECK_SESSION } from './types';

export const login = (username, password) => {
    localStorage.setItem('username', username);
    return {
        type: LOGIN,
        payload: { username }
    }
};

export const logout = () => {
    localStorage.removeItem('username');

    return {
        type: LOGOUT,
        payload: null
    }
};

export const checkSession = () => {
    const username = localStorage.getItem('username');
    let payload = null;

    if(username) {
        payload = { username };
    }

    return {
        type: CHECK_SESSION,
        payload
    };
};
