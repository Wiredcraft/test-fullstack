import * as React from "react";
import { useAuth } from "../../contexts/AuthContext";
import TalkCard from '../talk/Talk';

type Talk = {
	title: string;
	description: string;
	votes: string[];
	author: string;
}

type InputProps = {
	talks: Talk[]
}

function TalkList(props: InputProps) {
	const { isAuthenticated } = useAuth()
	const { talks } = props

	return <>
		{talks.map(cardInfo => <TalkCard cardInfo={cardInfo} isAuthenticated={isAuthenticated}></TalkCard>)}
	</>
}

export default TalkList