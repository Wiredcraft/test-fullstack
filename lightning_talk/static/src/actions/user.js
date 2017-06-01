import { API_AUTH_ROOT } from 'config'

export function signin () {
  return async (dispatch, getState) => {
    const body = getState().signin

    try {
      const response = await fetch(API_AUTH_ROOT, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SIGNIN_SUCCESS', username: body.username, token: json.token })
        dispatch({ type: 'CLOSE_SIGNIN_MODAL' })
      } else {
        dispatch({ type: 'SIGNIN_FAIL', error: json.detail })
      }
    } catch (error) {
      dispatch({ type: 'SIGNIN_FAIL', error: error.toString() })
    }
  }
}

export function signout () {
  return async dispatch => {
    try {
      const response = await fetch(`${API_AUTH_ROOT}logout`)
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SIGNOUT_SUCCESS', response: json })
      } else {
        dispatch({ type: 'SIGNOUT_FAIL', error: json.detail })
      }
    } catch (error) {
      dispatch({ type: 'SIGNOUT_SUCCESS', error: error.toString() })
    }
  }
}
