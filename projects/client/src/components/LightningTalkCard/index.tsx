import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckToSlot } from "@fortawesome/free-solid-svg-icons";
import { LightningTalk } from "@/apis";

import "./index.css";

function formatISODatetimeToDate(date: string) {
  return new Date(date).toLocaleDateString();
}

type Props = {
  item: LightningTalk;
  onClickPoll: (talkId: number) => void;
};

export default function LightningTalkCard({ item, onClickPoll }: Props) {
  const {
    id,
    poll,
    title,
    description,
    user,
    date_created: dateCreated,
  } = item;
  return (
    <div className="LightningTalkCard">
      <div className="LightningTalkCard__Poll">
        <FontAwesomeIcon
          icon={faCheckToSlot}
          size="2x"
          onClick={() => onClickPoll(id)}
          className="LightningTalkCard__PollButton"
          title="Click to poll"
          data-testid={`lightning-talk-poll-btn-${id}`}
        />
        <span className="LightningTalkCard__PollCount">{poll}</span>
      </div>
      <div>
        <h3 className="LightningTalkCard__Title">{title}</h3>
        <p className="LightningTalkCard__Desc">{description}</p>
        <div className="LightningTalkCard__Meta">
          <span>{user}</span>
          <span>{formatISODatetimeToDate(dateCreated)}</span>
        </div>
      </div>
    </div>
  );
}
