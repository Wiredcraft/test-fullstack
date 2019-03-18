import React, { useState } from "react";
import { usePush, Link } from "../lib/router";
import { completeUrl } from "./util";
import useAppState, { useDispatch } from "./use-app-state";
import FetchState, { onPatchSucceeded, onFetchFailed } from "./fetch-state";
import useTitle from "./use-title";
import "./button.css";
import "./form.css";
import "./app.css";

export default () => {
  const [form, setForm] = useState(() => ({ name: "", password: "" }));
  const {
    user,
    reqs: { login: [loading, error] = [false, null] }
  } = useAppState();
  const dispatch = useDispatch();
  const push = usePush();

  const submit = event => {
    event.preventDefault();
    dispatch({ reqs: { login: [true, null] } });

    fetch(completeUrl("/login"), {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(form),
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

  useTitle("Login");

  return (
    <main className="box box_main">
      <header className="header header_center">
        <h1>{user ? "Login As Another User" : "Login"}</h1>
      </header>
      <form className="form_narrow" onSubmit={submit}>
        <div className="form-field">
          <input
            required
            value={form.name}
            data-hasvalue={form.name ? "true" : ""}
            onChange={event => {
              setForm({ ...form, name: event.target.value });
            }}
          />
          <label>Name</label>
        </div>
        <div className="form-field">
          <input
            required
            type="password"
            value={form.password}
            data-hasvalue={form.password ? "true" : ""}
            onChange={event => {
              setForm({ ...form, password: event.target.value });
            }}
          />
          <label>Password</label>
        </div>
        <div className="form-action">
          <button className="button">Submit</button>
        </div>
      </form>
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
