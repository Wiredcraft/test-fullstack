import React, { useState } from "react";
import normalize from "../lib/normalize";
import { useReplace, Link } from "../lib/router";
import { talk as schema } from "../schema";
import { completeUrl } from "./util";
import useAppState, { useDispatch } from "./use-app-state";
import FetchState, { onPatchSucceeded, onFetchFailed } from "./fetch-state";
import useTitle from "./use-title";
import { sortTalkList } from "./vote-button";
import "./button.css";
import "./form.css";
import "./app.css";

export default () => {
  const [form, setForm] = useState(() => ({ title: "", description: "" }));
  const state = useAppState();
  const {
    entities: { talks },
    lists: { talks: list },
    reqs: { compose: [loading, error] = [false, null] }
  } = state;
  const replace = useReplace();
  const dispatch = useDispatch();

  const submit = event => {
    event.preventDefault();

    if (loading) return;

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
          const action = {
            entities,
            reqs: { compose: [false, null] }
          };

          if (list) {
            const items = sortTalkList(list, talks, entities.talks);
            action.lists = { talks: { items } };
          }

          dispatch(action);
          replace({ pathname: `/talks/${body.id}` });
        },
        error => {
          dispatch({ reqs: { compose: [false, error] } });
        }
      );
  };

  useTitle("Compose New Talk");

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
          <button disabled={loading} className="button">
            Submit
          </button>
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
            case "Title Length":
              return "Please make sure title is less than 200 characters long.";
          }
        }}
      </FetchState>
    </main>
  );
};
