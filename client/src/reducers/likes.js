import {
  HIDE_UPVOTE
} from '../actions/actionTypes'

const initialState = {
  upvoted: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HIDE_UPVOTE:
      return {...state, upvoted: [...action.upvoted, action.upvotedId]}
    default:
      return state
  }
}

export default reducer;
