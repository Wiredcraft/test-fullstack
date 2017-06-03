import { API_ROOT } from 'config'

export function fetchPosts(url = `${window.location.protocol}//${window.location.host}${API_ROOT}posts/`) {
  return async dispatch => {
    try {
      const response = await fetch(url)
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'FETCH_POSTS_SUCCESS', response: { ...json, current: url } })
      } else {
        dispatch({ type: 'FETCH_POSTS_FAIL', error: 'unable get posts' })
      }
    } catch (error) {
      dispatch({ type: 'FETCH_POSTS_FAIL', error: 'unable get posts' })
    }
  }
}

export function upvotePost(url) {
  return async (dispatch, getState) => {
    const { user, posts: { current } } = getState()

    try {
      const response = await fetch(`${url}upvote/`, {
        method: 'put',
        headers: { authorization: `JWT ${user.token}` }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'UPVOTE_POST_SUCCESS' })
        // then fresh current page
        dispatch(fetchPosts(current))
        // loading animation & progress bar component
        dispatch({ type: 'LOADING' })
      } else {
        dispatch({ type: 'UPVOTE_POST_FAIL', error: json.detail || 'upvote failed' })
      }
    } catch (error) {
      dispatch({ type: 'UPVOTE_POST_FAIL', error: error.toString() || 'upvote failed' })
    }
  }
}

export function createPost(callback) {
  return async (dispatch, getState) => {
    const { createPost, user } = getState()
    try {
      const response = await fetch(`${API_ROOT}posts/`, {
        method: 'post',
        headers: { 'content-type': 'application/json', authorization: `JWT ${user.token}` },
        body: JSON.stringify(createPost)
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'CREATE_POST_SUCCESS' })
        // append new post to posts-reducer
        dispatch({ type: 'APPEND_POST', post: json })
        // highlight new post DOM element
        dispatch({ type: 'HIGHLIGHT_POST_SET_URL', url: json.url })

        callback()
      } else {
        dispatch({ type: 'CREATE_POST_FAIL', error: 'nope' })
      }
    } catch (error) {
      dispatch({ type: 'CREATE_POST_SUCCESS', error: 'nope' })
    }
  }
}
