const init = {
  count: null,
  next: null,
  previous: null,
  results: [],
  all: [],
}

export default function (state = init, action) {
  const { type, response } = action

  switch (type) {
    case 'FETCH_POSTS_SUCCESS':
      if (response.next === state.next && (response.next !== null && state.next !== null)) {
        return state
      }
      return { ...response, all: [...state.all, ...response.results] }

    default:
      return state
  }
}
