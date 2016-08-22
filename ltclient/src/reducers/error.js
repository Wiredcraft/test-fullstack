function error(state = '', action) {
  switch (action.type) {
    case 'DISPLAY_ERROR':
      return action.message;
    case 'DISMISS_ERROR':
      return '';
    default:
      return state;
  }
}

export default error;