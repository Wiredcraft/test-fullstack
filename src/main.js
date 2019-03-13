import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";

ReactDOM.render(
  <App initialState={window.__PRELOADED_STATE__} />,
  document.getElementById("root")
);
