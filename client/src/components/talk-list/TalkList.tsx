import * as React from "react";
import { useAuth } from "../../contexts/AuthContext";
import TalkCard from '../talk/TalkCard';
import { TalkCardInfo } from '../../types/talk';
import './talk-list.css';

type InputProps = {
	talks: TalkCardInfo[]
}

function TalkList(props: InputProps) {
	const { isAuthenticated } = useAuth()
	const { talks } = props

	return (
		<div className="talk-list">
			{talks.map(cardInfo => <TalkCard cardInfo={cardInfo} isAuthenticated={isAuthenticated}></TalkCard>)}
		</div>
	)
}

export default TalkList