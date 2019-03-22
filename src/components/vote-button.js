import React, { useContext, Fragment } from "react";
import { merge, completeUrl, cx } from "./util";
import { State, Dispatch } from "./app-state";
import FetchState, { onPatchSucceeded, onFetchFailed } from "./fetch-state";
import { ChevronUp as Icon } from "./icon";
import "./button.css";

export function sortTalkList(listState, talks, updates) {
  const map = merge(talks, updates, 2);

  return Object.values(map)
    .sort(
      (a, b) =>
        b.rating - a.rating ||
        new Date(b.time_created) - new Date(a.time_created)
    )
    .map(v => v.id);
}

export default ({ icon, id, active, className }) => {
  const reqKey = `vote-${id}`;
  const {
    entities: {
      talks,
      talks: { [id]: talk }
    },
    lists: { talks: list },
    reqs: { [reqKey]: [loading, error] = [false, null] }
  } = useContext(State);
  const dispatch = useContext(Dispatch);

  const onClick = () => {
    dispatch({ reqs: { [reqKey]: [true, null] } });

    fetch(completeUrl(`/talks/${id}/vote`), {
      method: active ? "DELETE" : "PUT",
      credentials: "include"
    })
      .then(onPatchSucceeded, onFetchFailed)
      .then(
        () => {
          const rating = active ? talk.rating - 1 : talk.rating + 1;
          const voted = active ? false : true;
          const talksUpdates = { [id]: { rating, voted } };
          const action = {
            entities: { talks: talksUpdates },
            reqs: { [reqKey]: [false, null] }
          };

          if (list) {
            const items = sortTalkList(list, talks, talksUpdates);
            action.lists = { talks: { items } };
          }

          dispatch(action);
        },
        error => {
          dispatch({ reqs: { [reqKey]: [false, error] } });
        }
      );
  };

  return (
    <Fragment>
      {icon ? (
        <button
          disabled={loading}
          className={cx(className, active && "active")}
          onClick={onClick}
        >
          <Icon />
        </button>
      ) : (
        <button
          className={cx("button", className)}
          disabled={loading}
          onClick={onClick}
        >
          {active ? "Voted" : "Vote"}
        </button>
      )}
      <FetchState
        loading={loading}
        error={error}
        onDismissError={() => {
          dispatch({ reqs: { [reqKey]: [false, null] } });
        }}
      >
        {name => {
          if (name === "Unauthorized") {
            return "Only an authorized user can vote.";
          }
        }}
      </FetchState>
    </Fragment>
  );
};
