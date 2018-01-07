const React = require("react");
const ReactDOM = require("react-dom");
const AppPage = require("./components/app-page.jsx");
const AppRouter = require("./components/app-router.jsx");

window.app = {

	state : {
		data : {},
		isInitialized : false,
	},

	apiEndpoint : '/',

	/**
	 * services manage the communication with backend
	 */
	services : require('./services.jsx'),

	/**
	 * Initializes the application :
	 *  - display loader
	 *  - retrieves data
	 *  - update the app
	 */
	init : function() {
		/* The initialized state allows display a loader at the beginning
		 * It comes especiall useful when displaying a form to update data */
		app.state.isInitialized = false;
		app.render();
		app.services.getTalks(function(data) {
			app.state.data.talks = data;
			app.services.getVotes(function(data) {
				app.state.data.votes = data;
				if (app.userIsConnected()) {

					// Check if the user connected actually exists
					app.services.checkUser(window.localStorage.currentUsername, function(response) {
						if (!response) {
							delete window.localStorage.currentUsername;
						}
						app.state.isInitialized = true;
						app.render();
					})
				}
				else {
					app.state.isInitialized = true;
					app.render();
				}
			});
		});
	},


	/**
	 * Ajax requests use the browser Fetch API
	 */
	fetch : function(uri, post, callback) {
		const params = {
			credentials : 'same-origin',
		};
		if (post) {
			params.method = 'POST';
			params.headers = {
				"Content-type": "application/json; charset=UTF-8" 
			};
			params.body = JSON.stringify(post);
		}
		fetch(uri, params).then(function(response) {
			return response.text();
		})
		.then(function(responseText) {
			if (responseText != '') {
				try {
					const responseData = JSON.parse(responseText);
					// app.render();
					if (callback && typeof callback === 'function') {
						callback(responseData);
					}
				}
				catch (error) {
					console.error(error);
				}
			}
			else {
				if (callback && typeof callback === 'function') {
					callback();
				}
			}
		})
		.catch(function(error) {
			console.error(error);
		});
	},


	/**
	 * Get format : index.php/[action]/[id/param]
	 */
	get : function(uri, callback) {
		app.fetch(app.apiEndpoint+uri, null, callback);
	},

	
	post : function(uri, data, callback) {
		app.fetch(app.apiEndpoint+uri, data, callback);
	},


	/**
	 * Updates the display of the app
	 */
	render : function() {
		ReactDOM.render(<AppRouter />, document.getElementById('react-root'));
	},


	userIsConnected : function() {
		return window.localStorage.currentUsername 
			&& typeof window.localStorage.currentUsername === 'string'
			&& window.localStorage.currentUsername.length > 0;
	},
};

window.onload = app.init;
