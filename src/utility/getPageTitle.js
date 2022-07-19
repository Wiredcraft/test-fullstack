import CONSTANTS from 'constants'

export default function getPageTitle(pathname) {
  const { ROUTES_NAMES } = CONSTANTS

  switch (pathname) {
    case ROUTES_NAMES?.HOME:
      return 'Home'
    case `/${ROUTES_NAMES?.SIGN_UP}`:
      return 'Sign Up'
    case `/${ROUTES_NAMES?.CONFIRM_SIGN_UP}`:
      return 'Confirm Sign Up'
    case `/${ROUTES_NAMES?.SIGN_IN}`:
      return 'Sign In'
    case `/${ROUTES_NAMES?.PUBLISH_NEW_POLL}`:
      return 'Publish New Poll'
    default:
      return 'Page Not Found'
  }
}
