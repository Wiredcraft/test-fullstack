import * as React from "react";
import { voteTalk } from "../../services/talks";
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
    votes,
    voteCount,
    votedByUser
  }, isAuthenticated } = props

  const operation = votedByUser ? "REMOVE" : "ADD"
  const buttonClass = votedByUser ? "talk-card__button--voted" : "talk-card__button--not-voted"
  const buttonText = votedByUser ? "unvote" : "vote"

  return (
    <div className="talk-card">
      <h1>{title}</h1>
      <h3>by: {author}</h3>
      <p>{description}</p>
      {
        isAuthenticated ? <button
          onClick={() => voteTalk({ talkId: id!, operation })}
          className={buttonClass}>{buttonText}: {voteCount}</button>
          : null
      }
    </div>
  )
}

export default TalkCard;