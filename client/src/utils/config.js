const config = {};

config.apiHost = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://talk-lightning.herokuapp.com';

export default config;
