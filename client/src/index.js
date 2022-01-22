import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import angela from 'angela';
import ReactDOM from "react-dom";
import { message } from "Components";
import App from "./App";
import './style.less';

global.app = angela(require('./config').default);

// global error handler
app.error(error => {
  if (error.name == 'AuthenticationError') {
    app.storage.remove('user');
    app.storage.remove('authToken');
    location.reload();
  } else {
    message.show(error.message);
  }
})

ReactDOM.render(
  <App />,
  document.getElementById("root")
);