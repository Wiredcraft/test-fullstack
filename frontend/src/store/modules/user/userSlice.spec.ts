import { AnyAction } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';

import reducer, { IUserState } from './userSlice';

import { login, logout } from './user.api';

import { $axios } from '../../../plugins/axios';
import moxios from 'moxios';
import thunk from 'redux-thunk';

const initialState: IUserState = {
  user: {
    id: '',
    name: '',
    voteIds: []
  },
  status: 'idle',
  error: null
};

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('userSlice', () => {
  let store: any;

  beforeEach(function () {
    // import and pass your custom axios instance to this method
    moxios.install($axios as any);
    store = mockStore(initialState);
  });

  afterEach(function () {
    // import and pass your custom axios instance to this method
    moxios.uninstall();
  });

  test('should return the initial state', () => {
    expect(reducer(undefined, {} as AnyAction)).toEqual(initialState);
  });

  describe('thunks', () => {
    describe('login', () => {
      it('should login successfully, and add user to user state', async () => {
        const code = 'ioawjdiawodjoiawd';
        const provider = 'github';

        const newUser = {
          id: 'abc123',
          name: 'testname',
          voteIds: ['0', '1', '2']
        };

        // moxios.stubRequest(/github.*/, {
        //   status: 200,
        //   response: newUser
        // });

        const expectedActions = [
          { type: 'user/login/pending' },
          { type: 'user/login/fulfilled', payload: newUser }
        ];

        moxios.wait(function () {
          let request = moxios.requests.mostRecent();
          request
            .respondWith({
              status: 200,
              response: newUser
            })
            .then(function () {
              store.dispatch(login({ code, provider }));

              const actualAction = store.getActions();
              const actualState = store.getState();
              expect(actualAction.length).toEqual(expectedActions.length);
              expect(actualAction[actualAction.length - 1].payload).toEqual(newUser);
              expect(actualState.user).toEqual(newUser);
            });
        });
      });
    });

    describe('logout', () => {
      it('logs out user successfully', async () => {
        const newUser = {
          id: 'abc123',
          name: 'testname',
          voteIds: ['0', '1', '2']
        };

        store = mockStore({ ...initialState, user: newUser });

        const expectedActions = [
          { type: 'user/logout/pending' },
          { type: 'user/logout/fulfilled' }
        ];

        moxios.wait(function () {
          let request = moxios.requests.mostRecent();
          request
            .respondWith({
              status: 204
            })
            .then(function () {
              store.dispatch(logout());

              const actualAction = store.getActions();
              const actualState = store.getState();
              expect(actualAction.length).toEqual(expectedActions.length);
              expect(actualAction[0].type).toEqual(expectedActions[0].type);
              expect(actualAction[1].type).toEqual(expectedActions[1].type);

              expect(actualState).toEqual(initialState);
            });
        });
      });
    });
  });
});
