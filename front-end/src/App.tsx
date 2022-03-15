import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { getMeetingByID } from "./apiRequest";

import "./App.css";
import Login from "./Login";
import Meeting from "./Meeting";
import { IMeeting } from "./type";

export type FixMeLater = any

type PropsType = {
	title: string
}

interface IAppState {
	currentMeeting: IMeeting,
	currentUser: string
}

class App extends React.Component<PropsType, IAppState>{

	constructor(props: PropsType | Readonly<PropsType>) {
		super(props);
	}

	setAppState = (obj: any) => {
		this.setState(obj);
	}

	render() {
		return(			
		<div className="App">
			<header>
				<nav>
					<Link to="/"><h1>{this.props.title}</h1></Link>
				</nav>
			</header>

			<div className="content">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="login" element={<Login setAppState={this.setAppState} />} />
					<Route path="meeting" element={<Meeting user={this.state?.currentUser} meeting={this.state?.currentMeeting} />} />

					<Route path="*" element={<Navigate to="/login" />} />
				</Routes>
			</div>
		</div>
		);
	}
}

function Home() {
	return (
	<>
		<main>
			<h1>Welcome to the homepage!</h1>
			<p>A lightning talk is a very short presentation lasting only a few minutes, given at a conference or a meetup etc.</p>
			<p>Polling is often needed for the organizers to understand what is more interesting, or for people to decide what should go on stage.</p>
			<p>Inspired by Wechat - Creating Group Chat face to face, compose 4bits number meetingID and your name, just can start your meeting!</p>
			<p>Please, Please, Please be a nice user, d'ont impersonate</p>
			<nav>
				<Link to="/login">
					<button>Log in</button>
				</Link>
			</nav>

			<div className="cases-container">
				<div className="title">Possible Use Case</div>
				<div className="case">
					- Fast Decision making (Such as
					<a href="https://en.scrum-time.com/infobase/planning-poker.php" target="blank"> Planning Poker</a>
					)
				</div>
				<div className="case">- Group Todo List with priority</div>
				<div className="case">- etc...</div>
			</div>

			{/* <button onClick={async () => {
				await getMeetingByID('1234')
			}}>fetch</button> */}
		</main>
	</>
	);
}

export default App;