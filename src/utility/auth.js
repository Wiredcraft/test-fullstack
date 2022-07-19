import { Auth } from 'aws-amplify'
import { l } from 'utility'

export async function signUp(params) {
  const user = await Auth.signUp({
    attributes: {
      email: params?.email,
    },
    password: params?.password,
    username: params?.username,
  })
    .then((data) => data)
    .catch((error) => {
      l(error, 'SignUp', false, 'error')
      return false
    })

  return user
}

export async function confirmSignUp(username, code) {
  const user = await Auth.confirmSignUp(username, code)
    .then((data) => data)
    .catch((error) => {
      l(error, 'confirmSignUp', false, 'error')
      return false
    })

  return user
}

export async function resendConfirmationCode(username) {
  const user = await Auth.resendSignUp(username)
    .then((data) => data)
    .catch((error) => {
      l(error, 'resendConfirmationCode', false, 'error')
      return false
    })

  return user
}

export async function signOut() {
  const user = await Auth.signOut({ global: true })
    .then((data) => l(data, 'signOut', false, 'info'))
    .catch((error) => {
      l(error, 'signOut', false, 'error')
      return false
    })

  return user
}

export async function signIn(username, password) {
  /**
   * Perform global sign out before signing in to guarantee only one device is authorized
   * */
  // await Auth.signOut({ global: true })

  const user = await Auth.signIn(username, password)
    .then((data) => data)
    .catch((error) => {
      l(error, 'signIn', false, 'error')
      return false
    })

  return user
}

export async function getCurrentSession() {
  const session = await Auth.currentSession()
    .then((data) => data)
    .catch((error) => {
      l(error, 'getCurrentSession', false, 'error')
      return false
    })

  return session
}

export async function getCurrentAuthenticatedUser(shouldBypassCache = false) {
  /**
   * Must be called after the Auth module is configured, or the user has logged in.
   */
  const authenticatedUser = await Auth.currentAuthenticatedUser({
    bypassCache: shouldBypassCache,
  })
    .then((data) => {
      const user = {
        username: data?.username,
        email: data?.attributes?.email,
        cognitoID: data?.attributes?.sub,
      }

      return user
    })
    .catch((error) => {
      l(error, 'getCurrentAuthenticatedUser', false, 'log')
      return false
    })

  return authenticatedUser
}
