import {
  FETCH_TALKS,
  ADD_TALK,
  UPVOTE
} from '../actions/actionTypes'

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_TALKS:
      return {...state, talks: action.talks}
    case ADD_TALK:
      return {...state, talks: [...action.allTalks]}
    case UPVOTE:
      return {...state, talks: [...action.allTalks]}
    default:
      return state
  }
}

export default reducer;
