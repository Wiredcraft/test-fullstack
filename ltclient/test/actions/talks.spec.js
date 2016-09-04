import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../src/actions';
import nock from 'nock';
import expect from 'expect';

import { when } from '../../src/utils';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const apiUrl = 'http://localhost:3000';

describe('actions - talks', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  it('fetch talks', () => {
    const talk = {
      title: 'hello',
      description: 'dump description',
      speaker: 'john',
      cover: 'http://i.imgur.com/i937FSq.jpg',
      createdAt: '2016-09-02T12:54:31.805Z',
      voteCount: 2,
      id: 3,
      submitterId: 1,
      submitter: {
        username: 'alice',
        email: 'alice@me.com',
        id: 1,
      },
    };

    const res = [
      talk,
      talk,
      talk,
    ];

    nock(apiUrl)
      .get('/api/Talks?filter[order]=voteCount%20DESC' +
            '&filter[include]=submitter')
      .reply(200, res);

    const talkRes = {
      title: talk.title,
      id: talk.id,
      speaker: talk.speaker,
      cover: talk.cover,
      description: talk.description,
      submitter: talk.submitter.username,
      createdAt: when(talk.createdAt),
      upvote: talk.voteCount,
      voted: false,
    };
    const expectedActions = [
      {
        type: 'REQUEST_TALKLIST',
      },
      {
        type: 'RECEIVE_TALKLIST',
        talks: [talkRes, talkRes, talkRes],
      },
    ];

    const store = mockStore({ user: {} });

    return store.dispatch(actions.fetchTalks())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

  });
});
