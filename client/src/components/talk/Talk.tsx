import * as React from "react";
type Talk = {
	title: string;
	description: string;
	votes: string[];
	author: string;
}



type InputProps = {
	isAuthenticated: boolean,
	cardInfo: Talk
}

function TalkCard(props: InputProps) {
	const { cardInfo: { author, description, title, votes }, isAuthenticated } = props
	return (
		<div>
			<h1>{author}</h1>
			<h1>{description}</h1>
			<h1>{title}</h1>
			<h1>{votes}</h1>
		</div>
	)
}

export default TalkCard;