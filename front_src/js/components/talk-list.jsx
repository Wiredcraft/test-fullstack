
const React = require("react");
const ReactRouterDom = require('react-router-dom');
const Link = ReactRouterDom.Link;

const AppPage = require('./app-page.jsx');
const AppButton = require('./app-button.jsx');

/**
 * Displays the list of talks
 */
class TalkList extends React.Component {

	// unvote() {
	// }

	vote(talkId) {
		const vote = {
			talkId: talkId,
			username : window.localStorage.currentUsername,
		}
		app.services.createVote(vote, function() {
			// After adding a vote, the list is refreshed
			app.services.getVotes(function(votes) {
				app.state.data.votes = votes;
				app.render();
			});
		});
	}

	render () {
		const self = this;
		const talks = [];

		// If a user is connected, they can vote
		const canVote = app.userIsConnected();

		/**
		 * Votes are stored in object with talkId as key
		 */
		const voteUsers = {}; // users who have voted
		const voteCounts = {}; // number of votes
		if (app.state.data.votes) {
			for (let k in app.state.data.votes) {

				// List of users who have voted for this talk
				if (!voteUsers[app.state.data.votes[k].talkId]) {
					voteUsers[app.state.data.votes[k].talkId] = [];
				}
				voteUsers[app.state.data.votes[k].talkId].push(app.state.data.votes[k].username);

				// Number of votes for this talk
				if (!voteCounts[app.state.data.votes[k].talkId]) {
					voteCounts[app.state.data.votes[k].talkId] = 0;
				}
				voteCounts[app.state.data.votes[k].talkId]++;
			}
		}

		// Talks are arranged in a list
		if (app.state.data.talks) {
			for (let k in app.state.data.talks) {
				let talk = app.state.data.talks[k];
				talk.voteCount = voteCounts[talk.id] ? voteCounts[talk.id] : 0;
				if (canVote) {
					talk.currentUserHasVoted = (voteUsers[talk.id] 
						// user cannot vote if they have already voted for this talk
						&& voteUsers[talk.id].indexOf(window.localStorage.currentUsername) > -1
					); 
				}
				talks.push(talk);
			}
		}

		// Sort list of talks by nulber of votes
		talks.sort((a, b) => (b.voteCount - a.voteCount));

		return (
			<AppPage>
				<h1>Talks</h1>
				<table>
					<tbody>
						{talks.map(elt => (
							<tr key={elt.id}>
								<td>
									<Link to={"/talk-view/"+elt.id}>{elt.title}</Link>
								</td>
								<td>by {elt.username}</td>
								<td>{elt.voteCount}</td>
								{canVote ?
									<td>
										{elt.currentUserHasVoted || elt.username == window.localStorage.currentUsername ? 
											null
										:
											<AppButton onClick={self.vote.bind(self, elt.id)}>Vote</AppButton>
										}
									</td>
								:null}
							</tr>
						))}
					</tbody>
				</table>
			</AppPage>
		);
	}
}

module.exports = TalkList;