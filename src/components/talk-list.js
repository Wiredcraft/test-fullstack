import React, { Fragment } from "react";
import { Link } from "../lib/router";
import { talk as schema } from "../schema";
import useList from "./use-list";
import useTitle from "./use-title";
import Load from "./load";
import TalkItem from "./talk-item";
import "./talk-list.css";
import "./app.css";

export default () => {
  const [items, loading, error] = useList(schema);

  useTitle("All Talks");

  return (
    <main className="box box_main">
      <Load deps={{ items }} loading={loading} error={error}>
        {({ items }) => (
          <Fragment>
            <header className="talklist-header">
              <h1 className="talklist-h">Talks</h1>
              <span className="talklist-link">
                <Link to="/talks/compose">Compose New Talk</Link>
              </span>
            </header>
            <section>
              {items.map(item => <TalkItem key={item.id} item={item} />)}
            </section>
          </Fragment>
        )}
      </Load>
    </main>
  )
}
