import { API_AUTH_ROOT } from 'config'

export function signin(callback) {
  return async (dispatch, getState) => {
    const body = getState().signin

    try {
      const response = await fetch(API_AUTH_ROOT, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SIGNIN_SUCCESS', username: body.username, token: json.token })
        callback()
      } else {
        dispatch({ type: 'SIGNIN_FAIL', error: 'unable sign in' })
      }
    } catch (error) {
      dispatch({ type: 'SIGNIN_FAIL', error: 'unable sign in' })
    }
  }
}
