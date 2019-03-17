import React, { useState } from "react";
import { usePush, Link } from "../lib/router";
import { completeUrl } from "./util";
import useAppState, { useDispatch } from "./use-app-state";
import FetchState, { onPatchSucceeded, onFetchFailed } from "./fetch-state";
import "./talk-compose.css";
import "./button.css";
import "./app.css";

export default () => {
  const [form, setForm] = useState(() => ({ name: "", password: "" }));
  const {
    user,
    reqs: { login: [loading, error] = [false, null] }
  } = useAppState();
  const dispatch = useDispatch();
  const push = usePush();

  const submit = () => {
    dispatch({ reqs: { login: [true, null] } });

    fetch(completeUrl("/login"), {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ ...form }),
      headers: { "Content-Type": "application/json" }
    })
      .then(onPatchSucceeded, onFetchFailed)
      .then(
        body => {
          dispatch({ user: form.name, reqs: { login: [false, null] } });
          push({ pathname: "/" });
        },
        error => {
          dispatch({ reqs: { login: [false, error] } });
        }
      );
  };

  return (
    <main className="box box_main">
      <header className="tc-header">
        <h1>{user ? "Login As Another User" : "Login"}</h1>
      </header>
      <section>
        <div className="tc-field">
          <div className="tc-line">
            <div className="tc-name">Name</div>
            <input
              className="tc-input"
              value={form.name}
              onChange={event => {
                setForm({ ...form, name: event.target.value });
              }}
            />
          </div>
        </div>
        <div className="tc-field">
          <div className="tc-line">
            <div className="tc-name">Password</div>
            <input
              className="tc-input"
              type="password"
              value={form.password}
              onKeyDown={event => {
                if (event.which === 13) submit();
              }}
              onChange={event => {
                setForm({ ...form, password: event.target.value });
              }}
            />
          </div>
        </div>
      </section>
      <section className="tc-action">
        <button className="button" onClick={submit}>
          Submit
        </button>
      </section>
      <FetchState
        loading={loading}
        error={error}
        onDismissError={() => {
          dispatch({ reqs: { login: [false, null] } });
        }}
      >
        {name => {
          if (name === "Bad Request") {
            return "Incorrect name or password.";
          }
        }}
      </FetchState>
    </main>
  );
};
