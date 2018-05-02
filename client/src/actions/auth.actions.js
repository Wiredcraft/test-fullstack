import { LOGIN, LOGOUT } from './types';

export const login = (username, password) => {
    localStorage.setItem('username', username);
    console.log('login', { username } )
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
