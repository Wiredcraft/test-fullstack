const init = {
  count: null,
  next: null,
  previous: null,
  results: [],
  all: []
}

export default function(state = init, action) {
  const { type, response, post } = action

  switch (type) {
    case 'FETCH_POSTS_SUCCESS':
      return { ...response, all: [...response.results] }

    case 'APPEND_POST':
      return { ...state, all: [post, ...state.all] }

    default:
      return state
  }
}
