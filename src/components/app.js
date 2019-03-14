import React, { useReducer, useEffect } from "react";
import Router from "../lib/router";
import Routes from "../lib/routes";
import { merge, getTimeString } from "./util";
import { AppState, Dispatch } from "./use-app-state";
import TalkList from "./talk-list";
import TalkCompose from "./talk-compose";
import Talk from "./talk";
import "./app.css";

export const initialState = {
  entities: {},
  lists: {},
  reqs: {}
};

export const reducer = (state, action) => {
  state = { ...state };

  for (let key in action) {
    if (key === "entities") {
      state.entities = merge(state.entities, action.entities, 3);
    } else if (key === "lists") {
      state[key] = merge(state[key], action[key], 2);
    } else if (key === "reqs") {
      state[key] = merge(state[key], action[key]);
    } else {
      state[key] = action[key];
    }
  }

  return state;
};

const routes = [
  ["", TalkList],
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

export default ({ initialState, serverLocation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.group(getTimeString(new Date()));
    console.log(state);
    console.groupEnd();
  });

  return (
    <Router serverLocation={serverLocation}>
      <AppState.Provider value={state}>
        <Dispatch.Provider value={dispatch}>
          <Routes routes={routes} />
        </Dispatch.Provider>
      </AppState.Provider>
    </Router>
  );
};
