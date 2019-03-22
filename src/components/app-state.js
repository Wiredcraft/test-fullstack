import React, { createContext, useReducer } from "react";
import { merge, getTimeString } from "./util";

const initialState = {
  user: null,
  entities: {},
  lists: {},
  reqs: {}
};

const reducer = (state, action) => {
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

  if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
    console.group(getTimeString(new Date()));
    console.log(state);
    console.groupEnd();
  }

  return state;
};

export const State = createContext();
export const Dispatch = createContext();

export default ({ initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <State.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </State.Provider>
  );
};

export const getServerStore = () => {
  let state = initialState;

  return {
    get state() {
      return state;
    },

    dispatch(action) {
      state = reducer(state, action);
    }
  };
};
