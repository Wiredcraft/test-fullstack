import { AnyAction } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';

import reducer, { addVoteId, IUserState, removeVoteId } from './userSlice';

import { fetchMe, login, logout } from './user.api';

import { $axios } from '../../../plugins/axios';
import thunk from 'redux-thunk';

import mockAdapter from 'axios-mock-adapter';

const initialState: IUserState = {
  user: {
    id: '',
    name: '',
    votes: []
  },
  loggedIn: false,
  status: 'idle',
  error: null
};

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('userSlice', () => {
  let store: any;
  let mockAxios: mockAdapter;

  beforeAll(() => {
    mockAxios = new mockAdapter($axios);
  });

  beforeEach(function () {
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  test('should return the initial state', () => {
    expect(reducer(undefined, {} as AnyAction)).toEqual(initialState);
  });

  describe('reducers', () => {
    describe('addVoteId', () => {
      it('adds the voteId to the user state', async () => {
        const newVoteId = 'abc123123';
        const newState = { ...initialState };

        const res = reducer(newState, addVoteId(newVoteId));

        expect(res.user.votes).toContain(newVoteId);
      });

      it('does not add the same vote id if already present', async () => {
        const newVoteId = 'asiojdsiaod';
        const newState = { ...initialState, user: { ...initialState.user, votes: [newVoteId] } };

        const res = reducer(newState, addVoteId(newVoteId))

        expect(res.user.votes.length).toEqual(1)

        expect(res.user.votes[0]).toEqual(newVoteId)
      });
    });

    describe('removeVoteId', () => {
      it('removes given vote in the users state', async () => {
        const newVoteId = 'abc123123';
        const newState = { ...initialState, user: {...initialState.user, votes: [newVoteId]} };

        const res = reducer(newState, removeVoteId(newVoteId));

        expect(res.user.votes).not.toContain(newVoteId);
      })

      it('it does nothing if id not in user state', async () => {
        const newVoteId = 'abc123123';
        const newState = { ...initialState, user: {...initialState.user, votes: ['a', 'b', 'c']} };

        const res = reducer(newState, removeVoteId(newVoteId));

        expect(res.user.votes).not.toContain(newVoteId);
      })
    })
  });

  describe('thunks', () => {
    describe('login', () => {
      it('should login successfully, and add user to user state', async () => {
        const code = 'ioawjdiawodjoiawd';
        const provider = 'github';

        const newUser = {
          id: 'abc123',
          name: 'testname',
          votes: ['0', '1', '2']
        };

        const expectedActions = [
          { type: login.pending.type },
          { type: login.fulfilled.type, payload: newUser }
        ];

        mockAxios.onGet().reply(200, newUser);

        await store.dispatch(login({ code, provider }));

        const actualAction = store.getActions();
        expect(actualAction.length).toEqual(expectedActions.length);
        expect(actualAction[actualAction.length - 1].payload).toEqual(newUser);

        const newState = { ...initialState };

        const state = reducer(newState, expectedActions[1]);

        expect(state.user).toEqual(newUser);
        expect(state.loggedIn).toEqual(true);
      });
    });

    describe('logout', () => {
      it('logs out user successfully', async () => {
        const newUser = {
          id: 'abc123',
          name: 'testname',
          votes: ['0', '1', '2']
        };

        store = mockStore({ ...initialState, user: newUser });

        mockAxios.onDelete().reply(204);

        const expectedActions = [{ type: logout.pending.type }, { type: logout.fulfilled.type }];

        await store.dispatch(logout());

        const actualAction = store.getActions();
        expect(actualAction.length).toEqual(expectedActions.length);
        expect(actualAction[0].type).toEqual(expectedActions[0].type);
        expect(actualAction[1].type).toEqual(expectedActions[1].type);

        const state = reducer(
          { ...initialState, loggedIn: true, user: newUser },
          expectedActions[1]
        );

        expect(state.user).toEqual(initialState.user);
        expect(state.loggedIn).toEqual(false);
      });
    });

    describe('fetchMe', () => {
      it('fetches the user data if user already logged in', async () => {
        const newUser = {
          id: 'abc123',
          name: 'testname',
          votes: ['0', '1', '2']
        };

        const expectedActions = [
          { type: fetchMe.pending.type },
          { type: fetchMe.fulfilled.type, payload: newUser }
        ];

        mockAxios.onGet().reply(200, newUser);

        await store.dispatch(fetchMe());

        const actualAction = store.getActions();
        expect(actualAction.length).toEqual(expectedActions.length);
        expect(actualAction[0].type).toEqual(expectedActions[0].type);
        expect(actualAction[1].type).toEqual(expectedActions[1].type);

        const state = reducer({ ...initialState, loggedIn: true }, expectedActions[1]);

        expect(state).toEqual({
          user: newUser,
          loggedIn: true,
          status: 'succeeded',
          error: null
        });
      });
    });
  });
});
