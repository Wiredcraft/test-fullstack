const init = {
  username: '',
  token: '',
}

export default function (state = init, action) {
  const { type, username, token } = action

  switch (type) {
    case 'SIGNIN_SUCCESS':
      return { username, token }

    case 'SIGNOUT_SUCCESS':
      return init

    default:
      return state
  }
}
