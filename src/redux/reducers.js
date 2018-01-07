import {combineReducers} from 'redux'

const talks = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_TALK':
      return [
        {
          author: 'Jonathan Blow',
          title: 'Braid',
          description: 'Braid is a puzzle-platformer, drawn in a painterly style, where you can manipulate the flow of time in strange and unusual ways. From a house in the city, journey to a series of worlds and solve puzzles to rescue an abducted princess.',
          id: Date.now(),
          created: Date.now(),
          votes: 0,
        },
      ]
    case 'ADD_TALK':
      const {data} = action
      return [
        ...state,
        {
          ...data,
          id: Date.now(),
          created: Date.now(),
          votes: 0,
        }
      ]
    case 'VOTE_FOR_TALK':
      const {id} = action
      return state.map(talk =>
        (talk.id === id)
          ? {...talk, votes: talk.votes + 1}
          : talk
      )
    default:
      return state
  }
}

export default combineReducers({
  talks,
})
