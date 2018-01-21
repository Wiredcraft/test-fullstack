import {
  FETCH_TALKS,
  ADD_TALK,
  UPVOTE,
  UPDATE_INPUT_VALUE,
  UPDATE_ERRORS,
  UPDATE_FOCUSED,
  CLEAR_TALK
} from '../actions/actionTypes'

const initialState = {
  errors: [],
  newTalk: {
    title: '',
    desc: '',
    user: '',
    public: ''
  },
  focused: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TALKS:
      return {...state, talks: action.talks}
    case ADD_TALK:
      return {...state, talks: [...action.allTalks]}
    case UPVOTE:
      return {...state, talks: [...action.allTalks]}
    case UPDATE_INPUT_VALUE:
      return {...state, newTalk: action.newTalk}
    case UPDATE_ERRORS:
      return {...state, errors: action.errors}
    case UPDATE_FOCUSED:
      return {...state, focused: action.field}
    case CLEAR_TALK:
      return {
        ...state,
        errors: initialState.errors,
        newTalk: initialState.newTalk,
        focused: initialState.focused
      }
    default:
      return state
  }
}

export default reducer;
