import { AnyAction } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';

import { initBasePageState, initBaseState } from '../../core';
import { ITalk } from './talks.types';
import reducer, { ITalksState } from './talksSlice';

import mockAdapter from 'axios-mock-adapter';
import { $axios } from '../../../plugins/axios';
import thunk from 'redux-thunk';
import { createTalk, fetchTalks } from './talks.api';

const initialState: ITalksState = initBasePageState<ITalk>();

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('talksSlice', () => {
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

  describe('thunks', () => {
    describe('talks/create', () => {
      it('should create a talk successfully', async () => {
        const newTalk = {
          id: 'testid',
          title: 'test title',
          description: 'test description'
        };

        const expectedActions = [
          { type: createTalk.pending.type },
          { type: createTalk.fulfilled.type, payload: newTalk }
        ];

        mockAxios.onPost().reply(200, newTalk);

        await store.dispatch(createTalk(newTalk));

        const actualAction = store.getActions();
        expect(actualAction.length).toEqual(expectedActions.length);
        expect(actualAction[actualAction.length - 1].payload).toEqual(newTalk);

        const initState = initBasePageState<ITalk>();

        const state = reducer(initState, expectedActions[1]);

        expect(state.all[newTalk.id]).toEqual(newTalk);
        expect(state.ids).toContain(newTalk.id);
      });
    });

    describe('talks/fetch', () => {
      it('fetches talks and sets them in the store successfully', async () => {
        const talks = {
          items: [
            {
              id: 'testid21',
              title: 'test title',
              description: 'test description'
            },
            {
              id: 'testid112',
              title: 'test title',
              description: 'test description'
            },
            {
              id: 'testid44',
              title: 'test title',
              description: 'test description'
            },
            {
              id: 'testid3',
              title: 'test title',
              description: 'test description'
            },
            {
              id: 'testid2',
              title: 'test title',
              description: 'test description'
            }
          ],
          meta: {
            itemCount: 5,
            totalItems: 5,
            itemsPerPage: 20,
            totalPages: 1,
            currentPage: 1
          }
        };

        const expectedActions = [
          { type: fetchTalks.pending.type },
          { type: fetchTalks.fulfilled.type, payload: talks }
        ];

        mockAxios.onGet().reply(200, talks);

        await store.dispatch(fetchTalks({ sort: 'popular', page: 1 }));

        const actualAction = store.getActions();
        expect(actualAction.length).toEqual(expectedActions.length);
        expect(actualAction[actualAction.length - 1].payload).toEqual(talks);

        const initState = initBasePageState<ITalk>();

        const state = reducer(initState, expectedActions[1]);

        for (const talk of talks.items) {
          expect(state.all[talk.id]).toEqual(talk);
          expect(state.ids).toContain(talk.id);
        }
      });
    });
    describe('talks/vote', () => {
      it('sends vote and adds vote to user votes', async () => {
        
      })
    })
  });
});
