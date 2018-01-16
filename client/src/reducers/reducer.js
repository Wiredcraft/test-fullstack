import {
  ADD_TALK
} from '../actions/actionTypes'

// const initialState = {
//   talks: []
// }

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TALK:
      const newTalk = {...action.talk, id: (Math.max(action.allTalks.map(t => t.id)) + 1)}
      return {...state, talks: [...action.allTalks, newTalk]}
    default:
      return state
  }
}

export default reducer;
