import expect from 'expect';

import Immutable from 'immutable';
import AppReducer from '../reducers/AppReducer';
import RootActions from '../actions/RootActions';

describe('todos reducer', () => {
    it('should return the initial state', () => {
        expect(
            AppReducer(undefined, {
                type: RootActions.Keys.initializeApp
            }).toJS()
        ).toEqual({
            loggedStatus: 'Sign In',
            loggedUser: '',
            talks: Immutable.List().toJS(),
            myTalks: Immutable.List().toJS()
        });
    });
})