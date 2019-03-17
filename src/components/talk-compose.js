import React, { useState } from "react";
import normalize from "../lib/normalize";
import { usePush, Link } from "../lib/router";
import { talk as schema } from "../schema";
import { completeUrl } from "./util";
import useAppState, { useDispatch } from "./use-app-state";
import FetchState, { onPatchSucceeded, onFetchFailed } from "./fetch-state";
import "./button.css";
import "./form.css";
import "./app.css";

export default () => {
  const [form, setForm] = useState(() => ({ title: "", description: "" }));
  const state = useAppState();
  const {
    reqs: { compose: [loading, error] = [false, null] }
  } = state;
  const push = usePush();
  const dispatch = useDispatch();

  const submit = event => {
    event.preventDefault();
    dispatch({ reqs: { compose: [true, null] } });

    fetch(completeUrl("/talks"), {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" }
    })
      .then(onPatchSucceeded, onFetchFailed)
      .then(
        body => {
          const { entities } = normalize(body, schema);
          dispatch({
            entities,
            reqs: { compose: [false, null] }
          });
          push({ pathname: `/talks/${body.id}` });
        },
        error => {
          dispatch({ reqs: { compose: [false, error] } });
        }
      );
  };

  return (
    <main className="box box_main">
      <header className="header header_center">
        <h1>Compose New Talk</h1>
      </header>
      <form onSubmit={submit}>
        <div className="form-field">
          <input
            required
            value={form.title}
            data-hasvalue={form.title ? "true" : ""}
            onChange={event => {
              setForm({ ...form, title: event.target.value });
            }}
          />
          <label>Title</label>
        </div>
        <div className="form-field">
          <textarea
            required
            value={form.description}
            data-hasvalue={form.description ? "true" : ""}
            onChange={event => {
              setForm({ ...form, description: event.target.value });
            }}
          />
          <label>Description</label>
        </div>
        <div className="form-action">
          <button className="button">Submit</button>
        </div>
      </form>
      <FetchState
        loading={loading}
        error={error}
        onDismissError={() => {
          dispatch({ reqs: { compose: [false, null] } });
        }}
      >
        {name => {
          switch (name) {
            case "Unauthorized":
              return "Only an authorized user can create talks.";
            case "Title Required":
              return "Please give your talk a title.";
            case "Content Required":
              return "Please write your talk with some content.";
          }
        }}
      </FetchState>
    </main>
  );
};
