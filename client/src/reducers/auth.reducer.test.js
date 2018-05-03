import { LOGIN, LOGOUT, CHECK_SESSION } from "../actions/types";
import AuthReducer from './auth.reducer';

describe('Auth reducer', () => {
    it('handles an undefined action', () => {
        expect(AuthReducer({}, undefined)).toEqual({});
    });

    it('handles the LOGIN action', () => {
        const action = { type: LOGIN, payload: { username: 'test user'}};

        expect(AuthReducer({}, action)).toEqual({ user: action.payload });
    });

    it('handles the LOGOUT action', () => {
        const action = { type: LOGOUT, payload: null};

        expect(AuthReducer({}, action)).toEqual({ user: action.payload });
    });

    it('handles the CHECK_SESSION action', () => {
        const action = { type: CHECK_SESSION, payload: { username: 'test user'}};

        expect(AuthReducer({}, action)).toEqual({ user: action.payload });
    });
});
