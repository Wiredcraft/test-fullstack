import { expect } from '../test-helper';
import {LOGIN, LOGOUT, CHECK_SESSION} from './types';
import { login, logout, checkSession } from './auth.actions';

describe('Auth actions', () => {
    describe('login', () => {
        it('has the correct type and payload', () => {
            const username = 'User 1', password = 'Password 1';
            const action = login(username, password);
            expect(action.type).to.equal(LOGIN);
            expect(action.payload).to.equal({username})
        });
    });

    describe('logout', () => {
        it('has the correct type and payload', () => {
            const action = logout();

            expect(action.type).to.equal(LOGOUT);
            expect(action.payload).to.eql(null);
        });
    });

    describe('checkSession', () => {
        it('has the correct type and payload', () => {
            const action = checkSession(mode);
            expect(action.type).to.equal(CHECK_SESSION);
        });
    });
});
