const init = {
  count: null,
  current: null,
  next: null,
  previous: null,
  results: []
}

export default function(state = init, action) {
  const { type, response, post } = action

  switch (type) {
    case 'FETCH_POSTS_SUCCESS':
      return { ...response }

    case 'APPEND_POST':
      return { ...state, results: [post, ...state.results] }

    default:
      return state
  }
}
