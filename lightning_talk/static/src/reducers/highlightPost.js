const init = {
  url: ''
}

export default function(state = init, action) {
  const { type, url } = action

  switch (type) {
    case 'HIGHLIGHT_POST_SET_URL':
      return { url }

    case 'HIGHLIGHT_POST_RESET_URL':
      return { ...init }

    default:
      return state
  }
}
