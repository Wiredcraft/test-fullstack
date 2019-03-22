import React, { useContext, Fragment } from "react";
import { formatTime } from "./util";
import { talk as schema } from "../schema";
import { useUser, useItem } from "./use-resource";
import useTitle from "./use-title";
import NotFoundPage from "./not-found";
import { NotFound } from "./fetch-state";
import Load from "./load";
import VoteButton from "./vote-button";
import "./button.css";
import "./app.css";
import "./talk.css";

const Talk = ({ user, item }) => {
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
  const [user, userError] = useUser();
  const [item, loading, error] = useItem(schema, id);

  if (error && error[0] === NotFound) return <NotFoundPage />;

  return (
    <main className="box box_main">
      <Load deps={{ user, item }} loading={loading} error={userError || error}>
        {Talk}
      </Load>
    </main>
  );
};
