import swal from 'sweetalert';

const NOT_LOGGED_IN = 'notLoggedIn';
const NETWORK_ERROR = 'networkError';

const fireModal = (id, { actionName='perform this action' }={}) => {
  const options = {
    [NOT_LOGGED_IN]: {
      title: 'Not logged in',
      text: `You must be logged in to ${actionName}.`,
      icon: 'error'
    },
    [NETWORK_ERROR]: {
      title: 'Network error',
      text: 'A network error occurred. Please try again later.',
      icon: 'error'
    }
  };

  swal(options[id]);
}

export {
  fireModal,
  NOT_LOGGED_IN,
  NETWORK_ERROR
};
