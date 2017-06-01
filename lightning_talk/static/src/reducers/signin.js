const init = {
  username: '',
  password: '',
}

export default function (state = init, action) {
  const { username, password, type } = action

  switch (type) {
    case 'SIGNIN_FORM_CHANGE_USERNAME':
      return { ...state, username }

    case 'SIGNIN_FORM_CHANGE_PASSWORD':
      return { ...state, password }

    case 'SIGNIN_FORM_RESET':
    case 'SIGNIN_SUCCESS':
      return init

    default:
      return state
  }
}
