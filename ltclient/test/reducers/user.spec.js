import expect from 'expect';
import reducer from '../../src/reducers/user';

describe('reducers - user', () => {

  it('should return the initial state', () => {
    let beforeState = undefined;
    let afterState = {
      isFetching: false,
    };
    let action = {};

    expect(reducer(beforeState, action)).toEqual(afterState);
  });

  it('should handle START_LOGIN', () => {
    let beforeState = {
      isFetching: false,
    };
    let afterState = {
      isFetching: true,
    };
    let action = {
      type: 'START_LOGIN',
    };

    expect(reducer(beforeState, action)).toEqual(afterState);
  });

  it('should handle START_SIGNUP', () => {
    let beforeState = {
      isFetching: false,
    };
    let afterState = {
      isFetching: true,
    };
    let action = {
      type: 'START_SIGNUP',
    };

    expect(reducer(beforeState, action)).toEqual(afterState);
  });

  it('should handle DONE_LOGIN', () => {
    let beforeState = {
      isFetching: true,
    };
    let afterState = {
      isFetching: false,
      token: 123,
      username: 456,
      userId: 789,
    };
    let action = {
      type: 'DONE_LOGIN',
      token: 123,
      username: 456,
      userId: 789,
    };

    expect(reducer(beforeState, action)).toEqual(afterState);
  });

  it('should handle DONE_SIGNUP', () => {
    let beforeState = {
      isFetching: true,
    };
    let afterState = {
      isFetching: false,
    };
    let action = {
      type: 'DONE_SIGNUP',
    };

    expect(reducer(beforeState, action)).toEqual(afterState);
  });

  it('should handle FAIL_SIGNUP', () => {
    let beforeState = {
      isFetching: true,
    };
    let afterState = {
      isFetching: false,
    };
    let action = {
      type: 'FAIL_SIGNUP',
    };

    expect(reducer(beforeState, action)).toEqual(afterState);
  });

  it('should handle FAIL_LOGIN', () => {
    let beforeState = {
      isFetching: true,
      username: 'john',
    };
    let afterState = {
      isFetching: false,
      username: undefined,
    };
    let action = {
      type: 'FAIL_LOGIN',
    };

    expect(reducer(beforeState, action)).toEqual(afterState);
  });

  it('should handle START_LOGOUT', () => {
    let beforeState = {
      isFetching: true,
      username: 'john',
    };
    let afterState = {
      isFetching: false,
      username: undefined,
    };
    let action = {
      type: 'START_LOGOUT',
    };

    expect(reducer(beforeState, action)).toEqual(afterState);
  });
});
