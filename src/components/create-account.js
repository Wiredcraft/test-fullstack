import React, { useState } from "react";
import { usePush, Link } from "../lib/router";
import { completeUrl } from "./util";
import useAppState, { useDispatch } from "./use-app-state";
import FetchState, { onPatchSucceeded, onFetchFailed } from "./fetch-state";
import "./talk-compose.css";
import "./button.css";
import "./app.css";

export default () => {
  const [form, setForm] = useState(() => ({
    name: "",
    password: "",
    confirm: ""
  }));
  const {
    user,
    reqs: { createAccount: [loading, error] = [false, null] }
  } = useAppState();
  const dispatch = useDispatch();
  const push = usePush();

  const submit = () => {
    if (form.password !== form.confirm) {
      const error = ["Inconsistent Password"];
      dispatch({ reqs: { createAccount: [false, error] } });
      return;
    }

    dispatch({ reqs: { createAccount: [true, null] } });

    fetch(completeUrl("/users"), {
      method: "POST",
      body: JSON.stringify({ name: form.name, password: form.password }),
      headers: { "Content-Type": "application/json" }
    })
      .then(onPatchSucceeded, onFetchFailed)
      .then(
        body => {
          dispatch({ user: form.name, reqs: { createAccount: [false, null] } });
          push({ pathname: "/" });
        },
        error => {
          dispatch({ reqs: { createAccount: [false, error] } });
        }
      );
  };

  return (
    <main className="box box_main">
      <header className="tc-header">
        <h1>{user ? "Create Another Account" : "Create Account"}</h1>
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
              onChange={event => {
                setForm({ ...form, password: event.target.value });
              }}
            />
          </div>
        </div>
        <div className="tc-field">
          <div className="tc-line">
            <div className="tc-name">Confirm</div>
            <input
              className="tc-input"
              type="password"
              value={form.confirm}
              onKeyDown={event => {
                if (event.which === 13) submit();
              }}
              onChange={event => {
                setForm({ ...form, confirm: event.target.value });
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
      <FetchState loading={loading} error={error}>
        {name => {
          switch (name) {
            case "Inconsistent Password":
              return "You confirmed with an different password.";
            case "Name Required":
              return "Please enter a name";
            case "Password Required":
              return "Please select a password";
            case "Invalid Name":
              return "User name should only contain A-Za-z0-9_ and is at least 3 characters long.";
            case "Invalid Password":
              return "Password should be at least 6 characters long.";
            case "Name Conflict":
              return "This name has been taken, please change another one.";
          }
        }}
      </FetchState>
    </main>
  );
};
