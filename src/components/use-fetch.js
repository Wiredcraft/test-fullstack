import React from "react";
import { useDispatch } from "./use-app-state";

let serverRunners = [];

export function rewind() {
  const recorded = serverRunners;
  serverRunners = [];
  return recorded;
}

const activeClientRunners = [];

export function reload() {
  activeClientRunners.forEach(run => run(true));
}

export default (fn, values = []) => {
  const dispatch = useDispatch();

  if (typeof window === "undefined") {
    serverRunners.push(fn);
  }

  const run = React.useCallback(
    (...args) => fn(dispatch, window.fetch, ...args),
    values
  );

  React.useEffect(() => {
    run();
    activeClientRunners.push(run);

    return () => {
      activeClientRunners.splice(activeClientRunners.indexOf(run), 1);
    }
  }, [run]);

  return run;
};
