import {FETCH_TALK_SUCCESS, ADD_TALK_START, ADD_TALK_SUCCESS, ADD_TALK_FAIL, VOTE_FOR_TALK_START,
  VOTE_FOR_TALK_FAIL} from './actions'
import reducer from './reducers'


describe('add a talk', () => {
  it('adds a talk immediately after user submits a new talk', () => {
    expect(
      reducer([], {
        type: ADD_TALK_START,
        data: {
          author: 'author',
          title: 'title',
          description: '',
        }
      })
    ).toEqual([
      {
        author: 'author',
        title: 'title',
        description: '',
      }
    ])
  })

  it('merges current talk with the object server returns when adding a talk succeeds', () => {
    expect(
      reducer([
        {
          id: 1,
          author: 'author',
          title: 'title',
          description: '',
        }
      ], {
        type: ADD_TALK_SUCCESS,
        data: {
          id: 1,
          created: 1515566058608,
        }
      })
    ).toEqual([
      {
        id: 1,
        author: 'author',
        title: 'title',
        description: '',
        created: 1515566058608,
      }
    ])
  })

  it('removes current talk when adding a talk fails', () => {
    expect(
      reducer([
        {
          id: 1,
          author: 'author',
          title: 'title',
          description: '',
        }
      ], {
        type: ADD_TALK_FAIL,
        data: {
          id: 1,
        }
      })
    ).toEqual([])
  })
})

describe('vote for a talk', () => {
  it('update state of the voted talk immediately after user votes for a talk', () => {
    expect(
      reducer([
        {
          id: 1,
          votes: 0,
          voted: false,
        }
      ], {
        type: VOTE_FOR_TALK_START,
        id: 1,
      })
    ).toEqual([
      {
        id: 1,
        votes: 1,
        voted: true,
      }
    ])
  })

  it('reverts the state change when voting for a talk fails', () => {
    expect(
      reducer([
        {
          id: 1,
          votes: 1,
          voted: true,
        }
      ], {
        type: VOTE_FOR_TALK_FAIL,
        id: 1,
      })
    ).toEqual([
      {
        id: 1,
        votes: 0,
        voted: false,
      }
    ])
  })
})
