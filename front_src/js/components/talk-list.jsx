
const React = require("react");
const ReactRouterDom = require('react-router-dom');
const Link = ReactRouterDom.Link;

const AppPage = require('./app-page.jsx');

/**
 * Displays the list of talks
 */
class TalkList extends React.Component {

	render () {
		const self = this;
		const talks = [];
		if (app.state.data.talks) {
			for (let k in app.state.data.talks) {
				talks.push(app.state.data.talks[k]);
			}
		}

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
							</tr>
						))}
					</tbody>
				</table>
			</AppPage>
		);
	}
}

module.exports = TalkList;