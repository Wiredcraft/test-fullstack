import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import RootActions from '../actions/RootActions';
import expect from 'expect';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('dispatch actions', () => {

    it('test dispatch initializeApp', () => {
        const expectedActions = [
            { args: [], type: 'initializeApp'}
        ];
        const store = mockStore()
        return store.dispatch(RootActions.Actions.initializeApp([]))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});