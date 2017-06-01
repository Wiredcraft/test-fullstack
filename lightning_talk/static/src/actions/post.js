import { API_ROOT } from 'config'

export function fetchPosts () {
  return async dispatch => {
    try {
      const response = await fetch(`${API_ROOT}posts/`)
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'FETCH_POSTS_SUCCESS', response: json })
      } else {
        dispatch({ type: 'FETCH_POSTS_FAIL', error: json.detail })
      }
    } catch (error) {
      dispatch({ type: 'FETCH_POSTS_FAIL', error: error.toString() })
    }
  }
}

export function upvotePost (url) {
  return async dispatch => {
    try {
      const response = await fetch(`${url}upvote/`, { method: 'put' })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'UPVOTE_POST_SUCCESS', response: json })
      } else {
        dispatch({ type: 'UPVOTE_POST_FAIL', error: json.detail })
      }
    } catch (error) {
      dispatch({ type: 'UPVOTE_POST_FAIL', error: error.toString() })
    }
  }
}
