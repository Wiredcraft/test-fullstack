import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../src/actions';
import nock from 'nock';
import expect from 'expect';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const apiUrl = 'http://localhost:3000';

describe('actions - user', () => {

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

  afterEach(() => {
    nock.cleanAll();
  });

  it('login', () => {

    nock(apiUrl)
      .post('/api/AppUsers/login?include=user', user)
      .reply(200, res);

    const expectedActions = [
      {
        type: 'START_LOGIN',
      },
      {
        type: 'DONE_LOGIN',
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
  });

  it('show error if login with invalid user info', () => {

    const _res = {
      error: {
        name: 'Error',
        status: 401,
        message: 'login failed',
        statusCode: 401,
        code: 'LOGIN_FAILED',
        stack: 'Error: xxx'
      }
    }

    nock(apiUrl)
      .post('/api/AppUsers/login?include=user', user)
      .reply(401, _res);

    const expectedActions = [
      {
        type: 'START_LOGIN',
      },
      {
        type: 'DISPLAY_ERROR',
        message: 'Unable to login, is your username/password correct?'
      },
      {
        type: 'FAIL_LOGIN'
      }
    ];

    const store = mockStore();

    return store.dispatch(actions.login(user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('logout', () => {

    nock(apiUrl)
      .post('/api/AppUsers/logout?access_token=zxcvb', {})
      .reply(204);

    const expectedActions = [
      {
        type: 'START_LOGOUT',
      },
      {
        type: 'CLEAN_USERVOTEDTALKS'
      }
    ];

    const store = mockStore({ user: { token: 'zxcvb' }});

    return store.dispatch(actions.logout(user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('signup', () => {

    const _user = Object.assign({}, user);
    _user.email = 'john@me.com'

    const _res = {
      username: 'john',
      email: 'john@me.com',
      id: 10
    }

    nock(apiUrl)
      .post('/api/AppUsers', _user)
      .reply(200, _res);

    nock(apiUrl)
      .post('/api/AppUsers/login?include=user', user)
      .reply(200, res);

    const expectedActions = [
      {
        type: 'START_SIGNUP',
      },
      {
        type: 'DONE_SIGNUP'
      },
      {
        type: 'START_LOGIN',
      },
      {
        type: 'DONE_LOGIN',
        token: res.id,
        username: res.user.username,
        userId: res.userId,
      }
    ];

    const store = mockStore();

    return store.dispatch(actions.signup(_user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('show error if signup with existing user info', () => {

    const _user = Object.assign({}, user);
    _user.email = 'john@me.com'

    const _res = {
      error: {
        name: 'ValidationError',
        status: 422,
        statusCode: 422,
        message: 'whatever non human friendly message',
        details: {
          messages: {
            email: ['Email already exists'],
          },
        },
        stack: 'bla',
      },
    };

    nock(apiUrl)
      .post('/api/AppUsers', _user)
      .reply(422, _res);

    const expectedActions = [
      {
        type: 'START_SIGNUP',
      },
      {
        type: 'DISPLAY_ERROR',
        message: 'Username or Email already exist',
      },
      {
        type: 'FAIL_SIGNUP',
      },
    ];

    const store = mockStore();

    return store.dispatch(actions.signup(_user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
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