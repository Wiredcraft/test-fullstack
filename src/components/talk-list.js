import React, { Fragment } from "react";
import { Link } from "../lib/router";
import { talk as schema } from "../schema";
import useAppState from "./use-app-state";
import useList from "./use-list";
import useTitle from "./use-title";
import Load from "./load";
import TalkItem from "./talk-item";
import "./talk-list.css";
import "./button.css";
import "./app.css";

export default () => {
  const [items, loading, error] = useList(schema);
  const { user } = useAppState();

  useTitle("Hacker Talks");

  return (
    <main className="box box_main">
      <Load deps={{ items }} loading={loading} error={error}>
        {({ items }) => (
          <Fragment>
            <header className="talklist-header">
              <h1 className="talklist-h">Hacker Talks</h1>
              <span className="talklist-link">
                <Link to="/talks/compose">Compose New Talk</Link>
              </span>
            </header>
            {items.length ? (
              <section>
                {items.map(item => (
                  <TalkItem
                    key={item.id}
                    disableVote={user === item.username}
                    item={item}
                  />
                ))}
                <div className="talklist-end">END</div>
              </section>
            ) : (
              <section className="box box_center talklist-empty">
                No talks yet, become the first to compose.
              </section>
            )}
            {!user && (
              <section className="talklist-user">
                {"New to Hacker Talks? "}
                <Link to="/create-account">Create Account</Link>
                {" or "}
                <Link to="/login">Login</Link>
              </section>
            )}
          </Fragment>
        )}
      </Load>
    </main>
  );
};
