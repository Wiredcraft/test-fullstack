const init = {
  isSigninModalOpen: false,
}

export default function (state = init, action) {
  const { type } = action

  switch (type) {
    case 'OPEN_SIGNIN_MODAL':
      return { ...state, isSigninModalOpen: true }

    case 'CLOSE_SIGNIN_MODAL':
      return { ...state, isSigninModalOpen: false }

    default:
      return state
  }
}
