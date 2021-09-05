import * as React from "react";
import { useTalks } from "../../contexts/TalksContext";
import { getTalks, voteTalk } from "../../services/talks";
import { TalkCardInfo } from '../../types/talk';
import "./talkCard.css";

type InputProps = {
  isAuthenticated: boolean,
  cardInfo: TalkCardInfo
};

function TalkCard(props: InputProps) {
  const { cardInfo: {
    _id: id,
    author,
    description,
    title,
    voteCount,
    votedByUser,
    createdAt
  },      isAuthenticated } = props;

  const { reloadTalks } = useTalks();

  const operation = votedByUser ? "REMOVE" : "ADD";
  const buttonClass = votedByUser ? "talk-card-container__button--voted" : "talk-card-container__button--not-voted";
  const createdDate = new Date(createdAt!.toString());
  const formattedDate = `${createdDate.getHours()} : ${createdDate.getMinutes()}, ${createdDate.toDateString()}`;

  const onVote = async () => {
    voteTalk({ talkId: id!, operation });
    const talksFromServer = await getTalks();
    talksFromServer.length ? reloadTalks(talksFromServer) : null;
  };

  return (
    <div className="talk-card-container">
      {
        isAuthenticated ? <button
          onClick={onVote}
          className={buttonClass}>{voteCount}</button>
          : null
      }
      <div className="talk-card-container--row">
        <h1>{title}</h1>
        <p>{description}</p>
        <h3>by: {author}</h3>
        <p className="talk-created-date">{formattedDate}</p>
      </div>
    </div>
  );
}

export default TalkCard;
