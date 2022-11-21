import * as React from "react";
import "./index.css";
import { TalkType } from "@/type/type"
import { Icon } from "@/components";

interface Props {
    data: TalkType;
    onAddPoll: ()=>void;
}

export default function TalksListItem({data, onAddPoll}: Props) {
    const {author, title, poll , content, date_created, polled_by_me } = data;
    return (
      <div className="talk-list-item" >
        <div className="item-poll-wapper">
          <Icon name="icon-caret-up" onClick={onAddPoll} color={polled_by_me && "#0257df"}/>
          <span>{poll}</span>
        </div>
        <div className="content-wapper">
          <div className="title">{title}</div>
          <div className="talk-content">{content}</div>
          <div className="info">
            <span>Author: {author}</span>
            <span>Created Time: {date_created}</span>
          </div>
        </div>
      </div>
    );
}
