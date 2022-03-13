import React, { Component} from "react";
import { Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Login from "./Login";

class App extends Component{

	constructor(props) {
		super(props);
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
					<Route path="login" element={<Login />} />
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
				<Link to="/login">Sign in</Link>
			</nav>
		</main>
	</>
	);
}

export default App;