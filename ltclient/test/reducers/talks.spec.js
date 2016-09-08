import expect from 'expect';
import reducer from '../../src/reducers/talks';

describe('reducers - talks', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isFetching: false,
      shouldFetch: true,
      list: [],
    });
  });

  it('should handle REQUEST_TALKLIST/REQUEST_SUBMIT', () => {
    expect(reducer({ isFetching: false }, {
      type: 'REQUEST_TALKLIST',
    })).toEqual({
      isFetching: true,
    });

    expect(reducer({ isFetching: false }, {
      type: 'REQUEST_SUBMIT',
    })).toEqual({
      isFetching: true,
    });
  });

  it('should handle RECEIVE_TALKLIST', () => {
    expect(reducer({
      isFetching: true,
      shouldFetch: true,
    }, {
      type: 'RECEIVE_TALKLIST',
      talks: [1, 2],
    })).toEqual({
      isFetching: false,
      shouldFetch: false,
      list: [1, 2],
    });
  });

  it('should handle FAIL_TALKLIST', () => {
    let beforeState = {
      isFetching: true,
      shouldFetch: false,
    };
    let afterState = {
      isFetching: false,
      shouldFetch: true,
    };
    let action = {
      type: 'FAIL_TALKLIST',
    };

    expect(reducer(beforeState, action)).toEqual(afterState);
  });

  it('should handle REQUEST_VOTE', () => {
    let beforeState = {
      list: [
        {
          id: 1,
          voted: false,
          upvote: 100,
        },
        {
          id: 2,
          voted: false,
          upvote: 101,
        },
        {
          id: 3,
          voted: true,
          upvote: 102,
        }
      ],
    };
    let afterState = {
      list: [
        {
          id: 2,
          voted: false,
          upvote: 101,
        },
        {
          id: 3,
          voted: false,
          upvote: 101,
        },
        {
          id: 1,
          voted: false,
          upvote: 100,
        },
      ],
    };
    let action = {
      type: 'REQUEST_VOTE',
      talkId: 3,
    };

    expect(reducer(beforeState, action)).toEqual(afterState);

    beforeState = {
      list: [
        {
          id: 1,
          voted: false,
          upvote: 100,
        },
        {
          id: 2,
          voted: false,
          upvote: 101,
        },
        {
          id: 3,
          voted: true,
          upvote: 102,
        }
      ],
    };
    afterState = {
      list: [
        {
          id: 2,
          voted: true,
          upvote: 102,
        },
        {
          id: 3,
          voted: true,
          upvote: 102,
        },
        {
          id: 1,
          voted: false,
          upvote: 100,
        },
      ],
    };
    action = {
      type: 'REQUEST_VOTE',
      talkId: 2,
    };

    expect(reducer(beforeState, action)).toEqual(afterState);
  });

  it('should handle FAIL_VOTE', () => {
    let beforeState = {
      list: [
        {
          id: 1,
          voted: false,
          upvote: 100,
        },
        {
          id: 2,
          voted: false,
          upvote: 101,
        },
        {
          id: 3,
          voted: true,
          upvote: 102,
        }
      ],
    };
    let afterState = {
      list: [
        {
          id: 2,
          voted: false,
          upvote: 101,
        },
        {
          id: 3,
          voted: false,
          upvote: 101,
        },
        {
          id: 1,
          voted: false,
          upvote: 100,
        },
      ],
    };
    let action = {
      type: 'FAIL_VOTE',
      talkId: 3,
    };

    expect(reducer(beforeState, action)).toEqual(afterState);
  });

  it('should handle RECEIVE_USERVOTEDTALKS', () => {
    let beforeState = {
      list: [
        {
          id: 1,
          voted: false,
        },
        {
          id: 2,
          voted: false,
        },
        {
          id: 3,
          voted: false,
        },
        {
          id: 4,
          voted: false,
        },
      ]
    };
    let afterState = {
      list: [
        {
          id: 1,
          voted: true,
        },
        {
          id: 2,
          voted: false,
        },
        {
          id: 3,
          voted: true,
        },
        {
          id: 4,
          voted: true,
        },
      ],
    };
    let action = {
      type: 'RECEIVE_USERVOTEDTALKS',
      votedTalks: [1, 3, 4],
    };

    expect(reducer(beforeState, action)).toEqual(afterState);
  });

  it('should handle CLEAN_USERVOTEDTALKS', () => {
    let beforeState = {
      list: [
        {
          id: 1,
          voted: true,
        },
        {
          id: 2,
          voted: false,
        },
        {
          id: 3,
          voted: true,
        },
        {
          id: 4,
          voted: true,
        },
      ],
    };
    let afterState = {
      list: [
        {
          id: 1,
          voted: false,
        },
        {
          id: 2,
          voted: false,
        },
        {
          id: 3,
          voted: false,
        },
        {
          id: 4,
          voted: false,
        },
      ],
    };
    let action = {
      type: 'CLEAN_USERVOTEDTALKS',
    };

    expect(reducer(beforeState, action)).toEqual(afterState);
  });

  it('should handle RECEIVE_SUBMIT', () => {
    let beforeState = {
      isFetching: true,
      list: [1, 2, 3],
    };

    let afterState = {
      isFetching: false,
      list: [1, 2, 3, 'whatever'],
      justSubmitted: true,
    };

    let action = {
      type: 'RECEIVE_SUBMIT',
      talk: 'whatever',
    };

    expect(reducer(beforeState, action)).toEqual(afterState);
  });

  it('should handle SUBMIT_ANOTHER or url change', () => {
    let beforeState = {
      justSubmitted: true,
    };

    let afterState = {
      justSubmitted: false,
    };

    let action = {
      type: 'SUBMIT_ANOTHER',
    };

    expect(reducer(beforeState, action)).toEqual(afterState);

    action = {
      type: '@@router/LOCATION_CHANGE',
    };

    expect(reducer(beforeState, action)).toEqual(afterState);
  });

  it('should hanlde FAIL_SUBMIT / REQUEST_USERVOTEDTALKS / FAIL_USERVOTEDTALKS', () => {
    let beforeState = 'whatever';
    let afterState = beforeState;

    let action = {
      type: 'FAIL_SUBMIT',
    };
    expect(reducer(beforeState, action)).toEqual(afterState);
    action = {
      type: 'REQUEST_USERVOTEDTALKS',
    };
    expect(reducer(beforeState, action)).toEqual(afterState);
    action = {
      type: 'FAIL_USERVOTEDTALKS',
    };
    expect(reducer(beforeState, action)).toEqual(afterState);
  });
});
