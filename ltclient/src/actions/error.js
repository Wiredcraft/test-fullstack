/*
 * Action used to display a error message to web user
 */

function displayError(message) {
  return {
    type: 'DISPLAY_ERROR',
    message,
  };
}

function dismissError() {
  return {
    type: 'DISMISS_ERROR',
  };
}

export function showError(dispatch, message, timeout) {
  timeout = timeout || 3000;
  dispatch(displayError(message));
  setTimeout(() => {
    dispatch(dismissError());
  }, timeout);
}
