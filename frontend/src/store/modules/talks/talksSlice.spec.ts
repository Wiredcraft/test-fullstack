import { AnyAction } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';

import { initBasePageState, initBaseState } from '../../core';
import { ITalk } from './talks.types';
import reducer, { changeSortType, ITalksState } from './talksSlice';

import mockAdapter from 'axios-mock-adapter';
import { $axios } from '../../../plugins/axios';
import thunk from 'redux-thunk';
import { createTalk, fetchTalks, vote } from './talks.api';

const initialState: ITalksState = {
  ...initBasePageState<ITalk>(),
  sortType: 'popular'
};

const middleware = [thunk];
const mockStore = configureStore(middleware);

const talks = {
  items: [
    {
      id: 'testid21',
      title: 'test title',
      description: 'test description',
      voteCount: 5,
      userName: 'testerino',
      createdAt: 'now'
    },
    {
      id: 'testid112',
      title: 'test title',
      description: 'test description',
      voteCount: 5,
      userName: 'testerino',
      createdAt: 'now'
    },
    {
      id: 'testid44',
      title: 'test title',
      description: 'test description',
      voteCount: 5,
      userName: 'testerino',
      createdAt: 'now'
    },
    {
      id: 'testid3',
      title: 'test title',
      description: 'test description',
      voteCount: 5,
      userName: 'testerino',
      createdAt: 'now'
    },
    {
      id: 'testid2',
      title: 'test title',
      description: 'test description',
      voteCount: 5,
      userName: 'testerino',
      createdAt: 'now'
    }
  ],
  meta: {
    itemCount: 5,
    totalItems: 6,
    itemsPerPage: 5,
    totalPages: 2,
    currentPage: 1
  }
};

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

  describe('reducers', () => {
    describe('changeSortType', () => {
      it('changes the sortType', async () => {
        const initState = { ...initialState };

        const state = reducer(initState, changeSortType('newest'));

        expect(state.sortType).toEqual('newest');
      });
    });
  });

  describe('thunks', () => {
    describe('talks/create', () => {
      it('should create a talk successfully and add to vote list', async () => {
        const newTalk = {
          id: 'testid',
          title: 'test title',
          description: 'test description'
        };

        const expectedActions = [
          { type: createTalk.pending.type },
          { type: 'user/addVoteId', payload: newTalk.id },
          { type: createTalk.fulfilled.type, payload: newTalk }
        ];

        mockAxios.onPost().reply(200, newTalk);

        await store.dispatch(createTalk(newTalk));

        const actualAction = store.getActions();
        expect(actualAction.length).toEqual(expectedActions.length);
        expect(actualAction[actualAction.length - 1].payload).toEqual(newTalk);

        const initState = { ...initialState };

        const state = reducer(initState, expectedActions[2]);

        expect(state.all[newTalk.id]).toEqual(newTalk);
        expect(state.ids).toContain(newTalk.id);
      });
    });

    describe('talks/fetch', () => {
      it('fetches talks and sets them in the store successfully', async () => {
        const expectedActions = [
          { type: fetchTalks.pending.type },
          { type: fetchTalks.fulfilled.type, payload: talks }
        ];

        mockAxios.onGet().reply(200, talks);

        await store.dispatch(fetchTalks({ sort: 'popular', page: 1 }));

        const actualAction = store.getActions();
        expect(actualAction.length).toEqual(expectedActions.length);
        expect(actualAction[actualAction.length - 1].payload).toEqual(talks);

        const initState = { ...initialState };

        const state = reducer(initState, expectedActions[1]);

        for (const talk of talks.items) {
          expect(state.all[talk.id]).toEqual(talk);
          expect(state.ids).toContain(talk.id);
        }
      });

      it('adds to the current store if page > 1', async () => {
        const state2 = { ...initialState };

        state2.ids = talks.items.map((it: ITalk) => it.id);

        talks.items.forEach((item: ITalk) => {
          state2.all = { ...state2.all, [item.id]: item };
        });

        state2.meta = talks.meta;

        const newTalks = {
          items: [
            {
              id: 'testid3',
              title: 'test title3',
              description: 'test description3',
              voteCount: 12,
              userName: 'testerino3',
              createdAt: 'now3'
            }
          ],
          meta: {
            itemCount: 1,
            totalItems: 6,
            itemsPerPage: 5,
            totalPages: 2,
            currentPage: 2
          }
        };

        const action = { type: fetchTalks.fulfilled.type, payload: newTalks };

        const newState = reducer(state2, action);

        expect(newState.ids.length).toEqual(6);
        expect(newState.ids).toContain(newTalks.items[0].id);
        expect(newState.all[newTalks.items[0].id]).toEqual(newTalks.items[0]);
        expect(newState.meta).toEqual(newTalks.meta);
      });
    });
    describe('talks/vote', () => {
      it('sends vote and adds vote to user votes', async () => {
        const testId = 'djwaiodjiaow';
        const expectedActions = [
          { type: vote.pending.type },
          { type: 'user/addVoteId', payload: testId },
          { type: vote.fulfilled.type, payload: { voteState: true, id: testId } }
        ];

        mockAxios.onPut().reply(200, true);

        await store.dispatch(vote(testId));

        const actualAction = store.getActions();
        expect(actualAction.length).toEqual(expectedActions.length);
        expect(actualAction[actualAction.length - 1].payload).toEqual({
          voteState: true,
          id: testId
        });
      });

      it('sends vote and removes vote if vote already counted', async () => {
        mockAxios.onPut().reply(200, true);

        const testId = 'djwaiodjiaow';
        const expectedActions = [
          { type: vote.pending.type },
          { type: 'user/removeVoteId', payload: testId },
          { type: vote.fulfilled.type, payload: { voteState: false, id: testId } }
        ];

        mockAxios.onPut().reply(200, false);

        await store.dispatch(vote(testId));

        const actualAction = store.getActions();
        expect(actualAction.length).toEqual(expectedActions.length);
        expect(actualAction[actualAction.length - 1].payload).toEqual({
          voteState: false,
          id: testId
        });
      });
    });
  });
});
