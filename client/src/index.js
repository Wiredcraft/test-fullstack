import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import angela from 'angela';
import ReactDOM from "react-dom";
import App from "./App";
import './style.less';

global.app = angela(require('./config').default);

// global error handler
app.error(error => {
  if (error.code == '200010' || error.code == '200005') {
    app.storage.remove('access_token');
    location.href = app.config.loginUrl;
  } else {
    if (error.code) {
      message.error(error.message);
    }
  }
})

ReactDOM.render(
  <App />,
  document.getElementById("root")
);