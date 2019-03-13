import React from "react";
import { reload } from "./use-fetch";
import FetchState, { ErrorMessage } from "./fetch-state";
import Spinner from "./spinner";
import "./button.css";
import "./load.css";

export default ({ deps, nonDeps, loading, error, children }) => {
  const ready = Object.values(deps).every(value => value);

  if (ready) {
    const props = { ...deps, ...nonDeps };
    let content = null;

    if (React.isValidElement(children)) {
      content = React.cloneElement(children, props);
    } else if (typeof children === "object" || children.name) {
      content = React.createElement(children, props);
    } else {
      content = children(props);
    }

    return (
      <React.Fragment>
        {content}
        <FetchState immediate loading={loading} error={error} />
      </React.Fragment>
    );
  }

  if (error) {
    return (
      <div className="box box_center load load_error">
        <ErrorMessage error={error} />
        {error[0] !== "NotFound" && (
          <div style={{ marginTop: "var(--padding)" }}>
            <button className="button" onClick={reload}>
              Retry
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="box box_center load load-loading">
      <Spinner />
      <div className="load-text">LOADING</div>
    </div>
  );
};
