import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../src/actions';
import nock from 'nock';
import expect from 'expect';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const apiUrl = 'http://localhost:3000';

describe('actions - user', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  it('login', () => {

    const user = {
      username: 'john',
      password: 'john',
    };

    const res = {
      id: 'zxcvb',
      ttl: 129600,
      created: '2016-08-30T10:58:08.101Z',
      userId: 2,
      user: {
        username: 'john',
        eamil: 'john@me.com',
        id: 2,
      }
    };

    nock(apiUrl)
      .post('/api/AppUsers/login?include=user', user)
      .reply(200, res);

    const expectedActions = [
      {
        type: 'REQUEST_TOKEN',
      },
      {
        type: 'RECEIVE_TOKEN',
        token: res.id,
        username: res.user.username,
        userId: res.userId,
      }
    ];

    const store = mockStore();

    return store.dispatch(actions.login(user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  })
})


// {
//   "id": "Fgkyub6oV0RNBvZCoGqMuXdArxU8LrIFTIEVvqhdEjCwHfLtm10Uw9TbJo9AI0Df",
//   "ttl": 1209600,
//   "created": "2016-08-30T10:58:08.101Z",
//   "userId": 1,
//   "user": {
//     "username": "alice",
//     "email": "alice@example.com",
//     "id": 1
//   }
// }