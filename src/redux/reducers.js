import {FETCH_TALK_SUCCESS, ADD_TALK_START, ADD_TALK_SUCCESS, ADD_TALK_FAIL, VOTE_FOR_TALK_START,
  VOTE_FOR_TALK_FAIL} from './actions'

const talks = (state = [], action) => {
  switch (action.type) {
    case FETCH_TALK_SUCCESS:
      return action.data
    case ADD_TALK_START:
      return [
        ...state,
        action.data,
      ]
    case ADD_TALK_SUCCESS:
      return state.map(talk =>
        (talk.id === action.data.id)
          ? {...talk, ...action.data}
          : talk
      )
    case ADD_TALK_FAIL:
      return state.filter(talk =>
        (talk.id !== action.data.id)
      )
    case VOTE_FOR_TALK_START:
      return state.map(talk =>
        (talk.id === action.id)
          ? {...talk, votes: talk.votes + 1, voted: true}
          : talk
      )
    case VOTE_FOR_TALK_FAIL:
      return state.map(talk =>
        (talk.id === action.id)
          ? {...talk, votes: talk.votes - 1, voted: false}
          : talk
      )
    default:
      return state
  }
}

export default talks
