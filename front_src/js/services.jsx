
module.exports = {

	getTalks : function(callback) {
		if (callback && typeof callback == 'function') {
			callback(response.data);
		}
	},
};
