const API_ROOT = '/api'

export const FETCH_TALK_SUCCESS = 'FETCH_TALK_SUCCESS'
export const fetchTalks = () => {
  return dispatch => {
    fetch(`${API_ROOT}/talks`)
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: FETCH_TALK_SUCCESS,
        data,
      })
    })
  }
}

export const ADD_TALK_START = 'ADD_TALK_START'
export const ADD_TALK_SUCCESS = 'ADD_TALK_SUCCESS'
export const ADD_TALK_FAIL = 'ADD_TALK_FAIL'
export const addTalk = data => {
  return dispatch => {
    const finalData = {
      ...data,
      id: Date.now(), // FIXME: should not be generated at client side
      created: Date.now(),
      votes: 0,
      voted: false,
    }

    dispatch({
      type: ADD_TALK_START,
      data: finalData,
    })

    fetch(`${API_ROOT}/talks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalData)
    })
    .then(response => {
      if (response.status >= 300 && response.status !== 400) {
        throw response.statusText
      }
      return response.json()
    })
    .then(data => {
      if (data.violations) {
        dispatch({
          type: ADD_TALK_FAIL,
          data: finalData,
          violations: data.violations,
        })
      } else {
        dispatch({
          type: ADD_TALK_SUCCESS,
          data,
        })
      }
    })
    .catch(error => {
      dispatch({
        type: ADD_TALK_FAIL,
        data: finalData,
        error,
      })
    })
  }
}

export const VOTE_FOR_TALK_START = 'VOTE_FOR_TALK_START'
export const VOTE_FOR_TALK_FAIL = 'VOTE_FOR_TALK_FAIL'
export const voteForTalk = id => {
  return dispatch => {
    dispatch({
      type: VOTE_FOR_TALK_START,
      id,
    })

    fetch(`${API_ROOT}/talks/${id}/vote`, {
      method: 'POST', // maybe PATCH, but I think it as posting a vote instead of patching the talk
    })
    .then(response => {
      if (response.status >= 300) {
        dispatch({
          type: VOTE_FOR_TALK_FAIL,
          id,
          error: response.statusText,
        })
      }
    })
  }
}

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
      return action.data ?
        state.filter(talk =>
          (talk.id !== action.data.id)
        ) : state
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
