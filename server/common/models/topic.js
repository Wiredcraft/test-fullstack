var loopback = require('loopback');

module.exports = function(Topic) {

	// add createDate
	Topic.observe('before save', function(modelInstance, next) {
		if (modelInstance.instance) {
			modelInstance.instance.createDate = new Date();
		} else {
			modelInstance.data.createDate = new Date();
		}
		next();
	});

	// List populated Topics
	Topic.list = function(msg, cb) {
		Topic.find({
			include: ['user', 'likes']
		}, cb);
	}

	Topic.remoteMethod(
		'list', {
			http: {
				verb: 'get'
			},
			accepts: {
				arg: "nothing",
				type: "String"
			},
			returns: {
				type: [],
				root: true
			}
		}
	);

	// Delete Like
	Topic.deleteLike = function(idTopic, idLike, cb) {
		var ctx = loopback.getCurrentContext();
		var currentUser = ctx && ctx.get('accessToken');
		Topic.app.loopback.getModel('like').findOne({
			where: {
				'topicId': idTopic,
				'id': idLike
			}
		}, function(err, like) {
			if (err) {
				return cb(err);
			}
			if(!like){
				return cb(new Error());
			}
			if (like.userId === currentUser.userId) {
				like.remove(cb)
				// cb(null, '');
			} else {
				cb(new Error());
			}
		});
	}

	Topic.remoteMethod(
		'deleteLike', {
			accepts: [{
				arg: 'idTopic',
				type: 'string',
				required: true
			}, {
				arg: 'idLike',
				type: 'string',
				required: true
			}],
			http: {
				errorStatus: 401,
				status: 204,
				path: '/:idTopic/like/:idLike',
				verb: 'delete'
			},
			returns: {
				arg: '',
				type: 'string'
			}
		}
	);
};
