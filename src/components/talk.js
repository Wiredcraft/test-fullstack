import React, { Fragment } from "react";
import { formatTime } from "./util";
import { talk as schema } from "../schema";
import useAppState from "./use-app-state";
import useItem from "./use-item";
import useTitle from "./use-title";
import Load from "./load";
import VoteButton from "./vote-button";
import "./button.css";
import "./app.css";
import "./talk.css";

const Talk = ({ item }) => {
  const { user } = useAppState();

  useTitle(item.title);

  return (
    <article>
      <header className="talk-header">
        <h1 className="talk-h1">{item.title}</h1>
        <div className="talk-meta">
          {formatTime(item.time_created, true)}
          {` by ${item.username}`}
        </div>
      </header>
      {item.description && (
        <Fragment>
          <section className="talk-content">{item.description}</section>
          {user !== item.username && (
            <section className="talk-actions">
              <VoteButton id={item.id} active={item.voted} />
            </section>
          )}
        </Fragment>
      )}
    </article>
  );
};

export default ({ params: [id] }) => {
  const [item, loading, error] = useItem(schema, id);
  return (
    <main className="box box_main">
      <Load deps={{ item }} loading={loading} error={error}>
        {Talk}
      </Load>
    </main>
  );
};