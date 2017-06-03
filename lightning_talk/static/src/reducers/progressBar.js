const init = {
  loading: false
}

export default function(state = init, action) {
  const { type } = action

  switch (type) {
    case 'LOADING':
      return { loading: true }

    case 'LOADED':
      return { loading: false }

    default:
      return state
  }
}
