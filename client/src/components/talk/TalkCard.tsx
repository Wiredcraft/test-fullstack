import * as React from "react";
import { useTalks } from "../../contexts/TalksContext";
import { getTalks, voteTalk } from "../../services/talks";
import { TalkCardInfo } from '../../types/talk';
import "./talkCard.css";

type InputProps = {
  isAuthenticated: boolean,
  cardInfo: TalkCardInfo
}

function TalkCard(props: InputProps) {
  const { cardInfo: {
    _id: id,
    author,
    description,
    title,
    voteCount,
    votedByUser
  }, isAuthenticated } = props

  const { reloadTalks } = useTalks()

  const operation = votedByUser ? "REMOVE" : "ADD"
  const buttonClass = votedByUser ? "talk-card__button--voted" : "talk-card__button--not-voted"
  const buttonText = votedByUser ? "unvote" : "vote"

  const onVote = async () => {
    voteTalk({ talkId: id!, operation })
    const talksFromServer = await getTalks();
    reloadTalks(talksFromServer)
  }

  return (
    <div className="talk-card">
      <h1>{title}</h1>
      <p>{description}</p>
      <h3>by: {author}</h3>
      {
        isAuthenticated ? <button
          onClick={onVote}
          className={buttonClass}>{buttonText}: {voteCount}</button>
          : null
      }
    </div>
  )
}

export default TalkCard;