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

			<footer>
				This is footer
			</footer>
		</div>
		);
	}
}

function Home() {
	return (
	<>
		<main>
			<h2>Welcome to the homepage!</h2>
			<p>some instructions</p>
			<nav>
				<Link to="/login">
					<button>Log in</button>
				</Link>
			</nav>

			{/* <button onClick={async () => {
				await getMeetingByID('1234')
			}}>fetch</button> */}
		</main>
	</>
	);
}

export default App;