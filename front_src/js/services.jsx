
module.exports = {

	getTalks : function(callback) {
		app.get('api/getTalks', function(response) {
			if (callback && typeof callback == 'function') {
				callback(response);
			}
		});
	},


	getTalk : function(id, callback) {
		app.get('api/getTalk/'+id, function(response) {
			if (callback && typeof callback == 'function') {
				callback(response);
			}
		});
	},

	createTalk : function(data, callback) {
		app.post('api/createTalk', data, callback);
	},


	login : function(data, callback) {
		app.post('api/login', data, callback);
	},


	createUser : function(data, callback) {
		app.post('api/createUser', data, callback);
	},
};
