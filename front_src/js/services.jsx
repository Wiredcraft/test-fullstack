
/**
 * Contains all the services, which are functions that interact with the backend
 */
module.exports = {

	/**
	 * Retrieves the list of existing talks
	 * @Param: Function callback
	 * @Return: Array
	 */
	getTalks : function(callback) {
		app.get('api/getTalks', function(response) {
			if (callback && typeof callback == 'function') {
				callback(response);
			}
		});
	},


	/**
	 * Retrieves one talk with its id
	 * @Param: String id; id of the talk
	 */
	getTalk : function(id, callback) {
		app.get('api/getTalk/'+id, function(response) {
			if (callback && typeof callback == 'function') {
				callback(response);
			}
		});
	},


	/**
	 * @Param: Object data, data of the talk
	 * @Param: Function callback
	 */
	createTalk : function(data, callback) {
		app.post('api/createTalk', data, callback);
	},


	login : function(data, callback) {
		app.post('api/login', data, callback);
	},


	logout : function(callback) {
		delete app.state.currentUser;
		window.localStorage.currentUsername = null;
		if (callback && typeof callback == 'function') {
			callback(response);
		}
	},


	checkUser : function(username, callback) {
		app.get('api/checkUser/'+username, function(response) {
			if (callback && typeof callback == 'function') {
				callback(response);
			}
		});
	},


	createUser : function(data, callback) {
		app.post('api/createUser', data, callback);
	},


	/**
	 * Retrieves the list of existing talks
	 * @Param: Function callback
	 * @Return: Array
	 */
	getVotes : function(callback) {
		app.get('api/getVotes', function(response) {
			if (callback && typeof callback == 'function') {
				callback(response);
			}
		});
	},


	createVote : function(data, callback) {
		app.post('api/createVote', data, callback);
	},
};
