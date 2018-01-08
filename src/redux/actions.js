export const fetchTalks = () => {
  return dispatch => {
    fetch('/talks')
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: 'FETCH_TALK_SUCCESS',
        data,
      })
    })
  }
}

export const addTalk = data => {
  const finalData = {
    ...data,
    id: Date.now(), // FIXME: should not be generated at client side
    created: Date.now(),
    votes: 0,
    voted: false,
  }

  return dispatch => {
    dispatch({
      type: 'ADD_TALK_START',
      data: finalData,
    })

    fetch('/talks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalData)
    })
    .then(response => {
      if (response.status >= 300) {
        throw response.statusText
      }
      return response.json()
    })
    .then(data => {
      dispatch({
        type: 'ADD_TALK_SUCCESS',
        data,
      })
    })
    .catch(error => {
      dispatch({
        type: 'ADD_TALK_FAIL',
        data: finalData,
        error,
      })
    })
  }
}

export const voteForTalk = id => {
  return dispatch => {
    dispatch({
      type: 'VOTE_FOR_TALK_START',
      id,
    })

    fetch(`/talks/${id}/vote`, {
      method: 'POST', // maybe PATCH, but I think it as posting a vote instead of patching the talk
    })
    .then(response => {
      if (response.status >= 300) {
        dispatch({
          type: 'VOTE_FOR_TALK_FAIL',
          id,
          error: response.statusText,
        })
      }
    })
  }
}
