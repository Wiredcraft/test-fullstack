import {LOGIN, LOGOUT, CHECK_SESSION} from './types';
import { login, logout, checkSession } from './auth.actions';

describe('Auth actions', () => {
    const username = 'User 1', password = 'Password 1';

    let getItem, setItem, removeItem;
    beforeEach(() => {
        global.localStorage.getItem = jest.fn(() => username);
        global.localStorage.getItem = jest.fn(() => username);
        getItem = jest.spyOn(global.localStorage, 'getItem');
        setItem = jest.spyOn(global.localStorage, 'setItem');
        removeItem = jest.spyOn(global.localStorage, 'removeItem');
    });

    describe('login', () => {
        it('has the correct type and payload', () => {
            const action = login(username, password);

            expect(action.type).toEqual(LOGIN);
            expect(action.payload).toEqual({username});
            expect(setItem).toHaveBeenCalled();
        });
    });

    describe('logout', () => {
        it('has the correct type and payload', () => {
            const action = logout();

            expect(action.type).toEqual(LOGOUT);
            expect(action.payload).toEqual(null);
            expect(removeItem).toHaveBeenCalled();
        });
    });

    describe('checkSession', () => {
        it('has the correct type and payload', () => {
            const action = checkSession();
            expect(action.type).toEqual(CHECK_SESSION);
            expect(action.payload).toEqual({username});
            expect(getItem).toHaveBeenCalled();
        });
    });
});
