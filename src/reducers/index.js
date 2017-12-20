import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { NEW_TALK, VOTE } from '../actions/'

export const LightingTalks = (state = [], action) => {
  switch (action.type) {
    case NEW_TALK:
      const newTalk = Object.assign({},action.data)
      newTalk.id = state && state.length ? state.length + 1 : 1
      newTalk.voteCount = parseInt(Math.random()*100)
      newTalk.isVoted = false
      return state ? [... state, newTalk] : []

    case VOTE:
      const talk = state[action.index]
      const talks = [...state]
      talk.voteCount = talk.isVoted
      ? talk.voteCount - 1
      : talk.voteCount + 1
      talk.isVoted = !talk.isVoted
      talks[action.index] = talk
      return talks
    default:
      return state
  }
}

const reducers = combineReducers({
  routerReducer,
  LightingTalks
})

export default reducers
