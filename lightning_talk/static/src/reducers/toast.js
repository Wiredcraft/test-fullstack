const init = {
  type: '', // success || error || info || warning
  message: ''
}

export default function(state = init, action) {
  const { type, error, username } = action

  switch (type) {
    case 'CREATE_POST_FAIL':
    case 'SIGNIN_FAIL':
    case 'UPVOTE_POST_FAIL':
      return { message: error, type: 'error' }

    case 'SIGNIN_SUCCESS':
      return { message: `Welcome ${username}`, type: 'success' }

    case 'CREATE_POST_SUCCESS':
      return { message: 'yep', type: 'success' }

    case 'RESET_TOAST':
      return init

    default:
      return state
  }
}
