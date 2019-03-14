import React from "react";
import { Link } from "../lib/router";
import { formatTime } from "./util";
import VoteButton from "./vote-button";
import "./talk-item.css";

export default ({ item }) => {
  return (
    <div className="talkitem">
      <div className="talkitem-main">
        <h2 className="talkitem-title">
          <Link to={`/talks/${item.id}`}>{item.title}</Link>
        </h2>
        <div className="talkitem-meta">
          {`${item.rating} votes by ${item.username} at `}
          {formatTime(item.time_created)}
        </div>
      </div>
      <div className="talkitem-aside">
        <VoteButton id={item.id} active={item.voted} />
      </div>
    </div>
  );
};
