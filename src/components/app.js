import React from "react";
import Router, { Routes } from "../lib/router";
import TalkList from "./talk-list";
import CreateAccount from "./create-account";
import Login from "./login";
import TalkCompose from "./talk-compose";
import Talk from "./talk";
import AppState from "./app-state";
import NotFound from "./not-found";
import "./app.css";

const routes = [
  ["", TalkList],
  ["create-account", CreateAccount],
  ["login", Login],
  ["talks/compose", TalkCompose],
  ["talks/:id", Talk]
];

export default ({ initialState, serverLocation }) => (
  <Router serverLocation={serverLocation}>
    <AppState initialState={initialState}>
      <Routes routes={routes} notFound={NotFound} />
    </AppState>
  </Router>
);
