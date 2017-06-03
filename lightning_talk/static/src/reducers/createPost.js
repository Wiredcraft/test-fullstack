const init = {
  title: '',
  description: ''
}

export default function(state = init, action) {
  const { type, title, description } = action

  switch (type) {
    case 'CREATE_POST_FORM_CHANGE_TITLE':
      return { ...state, title }

    case 'CREATE_POST_FORM_CHANGE_DESCRIPTION':
      return { ...state, description }

    case 'CREATE_POST_FORM_RESET':
      return init

    default:
      return state
  }
}
