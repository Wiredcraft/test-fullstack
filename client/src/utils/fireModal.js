import swal from 'sweetalert';

const fireModal = (id, { actionName='perform this action' }={}) => {
  const options = {
    notLoggedIn: {
      title: 'Not logged in',
      text: `You must be logged in to ${actionName}.`,
      icon: 'error'
    },
    networkError: {
      title: 'Network error',
      text: 'A network error occurred. Please try again later.',
      icon: 'error'
    }
  };

  swal(options[id]);
}

export default fireModal;
