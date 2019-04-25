export const apiHost = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://talk-lightning.herokuapp.com';

export const firebaseConfig = {
  apiKey: 'AIzaSyCpquT9jfeyqrXlQ4s-zIZKtymnxwlBF9A',
  authDomain: 'talk-lightning.firebaseapp.com',
  databaseURL: 'https://talk-lightning.firebaseio.com',
  projectId: 'talk-lightning',
  storageBucket: 'talk-lightning.appspot.com',
  messagingSenderId: '12336253804'
};

// export {
//   apiHost,
//   firebaseConfig
// };
