import * as React from "react";
import { TalkCardInfo } from '../../types/talk';
import "./talkCard.css";

type InputProps = {
	isAuthenticated: boolean,
	cardInfo: TalkCardInfo
}

function TalkCard(props: InputProps) {
	const { cardInfo: {
		author,
		description,
		title,
		votes
	}, isAuthenticated } = props

	return (
		<div className="talk-card">
			<h1>{title}</h1>
			<h3>by: {author}</h3>
			<p>{description}</p>
			<button className="talk-card__button--not-voted">upVote: {votes.length}</button>
		</div>
	)
}

export default TalkCard;