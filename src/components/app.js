import React from "react";
import Router from "../lib/router";
import Routes from "../lib/routes";
import TalkList from "./talk-list";
import CreateAccount from "./create-account";
import Login from "./login";
import TalkCompose from "./talk-compose";
import Talk from "./talk";
import AppState from "./app-state";
import "./app.css";

const routes = [
  ["", TalkList],
  ["create-account", CreateAccount],
  ["login", Login],
  ["talks/compose", TalkCompose],
  ["talks/:id", Talk],
  [
    null,
    () => (
      <main
        className="box box_main box_center"
        style={{ color: "var(--light-font-color)" }}
      >
        Nothing is here
      </main>
    )
  ]
];

export default ({ initialState, serverLocation }) => (
  <Router serverLocation={serverLocation}>
    <AppState initialState={initialState}>
      <Routes routes={routes} />
    </AppState>
  </Router>
);
