import React, { useState } from "react";
import normalize from "../lib/normalize";
import { usePush, Link } from "../lib/router";
import { talk as schema } from "../schema";
import { completeUrl } from "./util";
import useAppState, { useDispatch } from "./use-app-state";
import FetchState, { onPatchSucceeded, onFetchFailed } from "./fetch-state";
import "./button.css";
import "./app.css";
import "./talk-compose.css";

export default () => {
  const [form, setForm] = useState(() => ({ title: "", description: "" }));
  const state = useAppState();
  const {
    reqs: { compose: [loading, error] = [false, null] }
  } = state;
  const push = usePush();
  const dispatch = useDispatch();

  const submit = () => {
    const body = { ...form };

    dispatch({ reqs: { compose: [true, null] } });

    fetch(completeUrl("/talks"), {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(body),
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
      <header className="tc-header">
        <h1>Compose New Talk</h1>
      </header>
      <section>
        <div className="tc-field">
          <div className="tc-line">
            <div className="tc-name">Title</div>
            <input
              className="tc-input"
              value={form.title}
              onChange={event => {
                setForm({ ...form, title: event.target.value });
              }}
            />
          </div>
        </div>
        <div className="tc-field">
          <div className="tc-line">
            <div className="tc-name">Description</div>
            <textarea
              className="tc-textarea"
              value={form.description}
              onChange={event => {
                setForm({ ...form, description: event.target.value });
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
            case "Unauthorized":
              return "Only an authorized user can create talks.";
            case "Title Required":
              return "Please give your talk a title."
            case "Content Required":
              return "Please write your talk with some content."
          }
        }}
      </FetchState>
    </main>
  );
};
