import React from "react";
import { formatTime } from "./util";
import { talk as schema } from "../schema";
import useItem from "./use-item";
import useTitle from "./use-title";
import Load from "./load";
import VoteButton from "./vote-button";
import "./button.css";
import "./app.css";
import "./talk.css";

const Talk = ({ item }) => {
  return (
    <article>
      <header className="talk-header">
        <h1 className="talk-h1">{item.title}</h1>
        <div className="talk-meta">
          {`created by ${item.username} at `}
          {formatTime(item.time_created, true)}
        </div>
      </header>
      <section className="talk-content">{item.description}</section>
      <section className="talk-actions">
        <VoteButton id={item.id} active={item.voted} />
      </section>
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
