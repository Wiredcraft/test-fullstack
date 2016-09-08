import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../src/actions';
import nock from 'nock';
import expect from 'expect';

import { when } from '../../src/utils';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const apiUrl = 'http://localhost:3000';

describe('actions - submit', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  const user = {
    userId: 3,
    username: 'alice',
    token: 'whatever',
  };

  it('submit a talk', () => {

    const talk = {
      title: 'random title',
      description: 'random description',
      speaker: 'john',
      cover: 'http://example.com/talk.png'
    };

    const res = Object.assign({}, talk, {
      createdAt: new Date(),
      voteCount: 0,
    });

    const expectedActions = [
      {
        type: 'REQUEST_SUBMIT',
      },
      {
        type: 'RECEIVE_SUBMIT',
        talk: Object.assign({}, talk, {
          submitter: user.username,
          createdAt: when(res.createdAt),
          upvote: 0,
          voteCount: 0,
          voted: false,
        }),
      },
    ];

    nock(apiUrl)
      .post(`/api/Talks?access_token=${user.token}`, talk)
      .reply(200, res);

    const store = mockStore({ user });

    return store.dispatch(actions.submit(talk))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

});
