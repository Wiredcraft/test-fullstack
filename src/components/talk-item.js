import React from "react";
import { Link } from "../lib/router";
import { formatTime } from "./util";
import VoteButton from "./vote-button";
import "./talk-item.css";

export default ({ disableVote, item }) => {
  return (
    <div className="talkitem">
      <h2 className="talkitem-title">
        {disableVote || (
          <VoteButton
            icon
            id={item.id}
            active={item.voted}
            className="talkitem-button"
          />
        )}
        <Link to={`/talks/${item.id}`}>{item.title}</Link>
      </h2>
      <div className="talkitem-meta">
        {`${item.rating} votes by ${item.username} at `}
        {formatTime(item.time_created)}
      </div>
    </div>
  );
};
