import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../src/actions';
import nock from 'nock';
import expect from 'expect';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const apiUrl = 'http://localhost:3000';

describe('actions - talks', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  const user = {
    userId: 3,
    token: 'whatever',
  };

  it('fetchUserVotedTalks - fetch voted talks list for a logged-in user', () => {

    const res = [
      { id: 1 },
      { id: 3 },
    ];

    const expectedActions = [
      {
        type: 'REQUEST_USERVOTEDTALKS',
      },
      {
        type: 'RECEIVE_USERVOTEDTALKS',
        votedTalks: [1, 3],
      }
    ];

    nock(apiUrl)
      .get(`/api/AppUsers/${user.userId}/voted?filter[order]=voteCount%20DESC&filter[fields]=id&access_token=${user.token}`)
      .reply(200, res);

    const store = mockStore({ user });

    return store.dispatch(actions.fetchUserVotedTalks())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('fetchUserVotedTalks - not dispatch any action if it is a guest user', () => {
    const store = mockStore({ user: {} });

    return store.dispatch(actions.fetchUserVotedTalks())
      .then(() => {
        expect(store.getActions()).toEqual([]);
      });
  })

  it('vote - logged-in user', () => {

    const talkId  = 123;

    const expectedActions = [
      {
        type: 'REQUEST_VOTE',
        talkId,
      },
      // no 'RECEIVE_VOTE' here
    ];

    nock(apiUrl)
      .post(`/api/Votes/upvote?access_token=${user.token}`, {
        voterId: user.userId,
        talkId,
      })
      .reply(200, {
        id: 111,
        talkId,
        voterId: user.userId,
      });

    const store = mockStore({ user });

    return store.dispatch(actions.vote(talkId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('vote - guest can not vote', () => {
    const talkId  = 123;
    const expectedActions = [
      {
        type: 'DISPLAY_ERROR',
        message: 'You can only vote after you logged in',
      },
    ];
    const store = mockStore({ user: {} });

    store.dispatch(actions.vote(talkId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
