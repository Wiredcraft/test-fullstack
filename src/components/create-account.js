import React, { useState, useContext } from "react";
import { Actions } from "../lib/router";
import { completeUrl } from "./util";
import { State, Dispatch } from "./app-state";
import FetchState, { onPatchSucceeded, onFetchFailed } from "./fetch-state";
import { useUser } from "./use-resource";
import useTitle from "./use-title";
import "./button.css";
import "./form.css";
import "./app.css";

export default () => {
  const [form, setForm] = useState(() => ({
    name: "",
    password: "",
    confirm: ""
  }));
  const {
    reqs: { createAccount: [loading, error] = [false, null] }
  } = useContext(State);
  const [user] = useUser();
  const dispatch = useContext(Dispatch);
  const { push } = useContext(Actions);

  const submit = event => {
    event.preventDefault();

    if (loading) return;

    if (form.password !== form.confirm) {
      const error = ["Inconsistent Password"];
      dispatch({ reqs: { createAccount: [false, error] } });
      return;
    }

    dispatch({ reqs: { createAccount: [true, null] } });

    fetch(completeUrl("/users"), {
      credentials: "include",
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

  useTitle("Create Account");

  return (
    <main className="box box_main">
      <header className="header header_center">
        <h1>{user ? "Create Another Account" : "Create Account"}</h1>
      </header>
      <form className="form_narrow" onSubmit={submit}>
        <div className="form-field">
          <input
            required
            className="tc-input"
            value={form.name}
            data-hasvalue={form.name ? "true" : ""}
            onChange={event => {
              setForm({ ...form, name: event.target.value });
            }}
          />
          <label className="form-label">Name</label>
        </div>
        <div className="form-field">
          <input
            required
            className="form-input"
            type="password"
            value={form.password}
            data-hasvalue={form.password ? "true" : ""}
            onChange={event => {
              setForm({ ...form, password: event.target.value });
            }}
          />
          <label className="form-label">Password</label>
        </div>
        <div className="form-field">
          <input
            className="form-input"
            type="password"
            value={form.confirm}
            data-hasvalue={form.confirm ? "true" : ""}
            onChange={event => {
              setForm({ ...form, confirm: event.target.value });
            }}
          />
          <label className="form-label">Confirm</label>
        </div>
        <div className="form-action">
          <button disabled={loading} className="button">
            Submit
          </button>
        </div>
      </form>
      <FetchState
        loading={loading}
        error={error}
        onDismissError={() => {
          dispatch({ reqs: { createAccount: [false, null] } });
        }}
      >
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
