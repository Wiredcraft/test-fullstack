const express = require('express');
const router = express.Router();

const repo = require('./repo.js');

/**
 * Parses the body and extracts the post data
 */
const reqToPost = function(req, res, callback) {
	var content ='';
	req.on('data', function(data) {
		content+=data;
	});
	req.on('end', function() {
		try {
			const post = JSON.parse(content);
			if (callback && typeof callback == 'function') {
				callback(post);
			}
		}
		catch (err) {
			console.log(err);
			res.send(err);
		}
	});
}


/**
 * Returns the list of posts
 */
router.get('/getTalks', function(req, res) {
	repo.Talk.find(function(err, talks) {
		if (err) {
			res.send(err);
		}
		else {
			const nTalks = [];
			for (var i = 0; i < talks.length; i++) {
				nTalks.push({
					id : talks[i]._id,
					title : talks[i].title,
					description : talks[i].description,
					username : talks[i].username,
				});
			}
			res.json(nTalks);
		}
	});
});


/**
 * Get talk by Id
 */
router.get('/getTalk/:id', function(req, res) {
	const id = req.params.id;
	repo.Talk.find({_id:id}, function(err, talks) {
		if (err) {
			res.send(err);
		}
		else if (talks.length) {
			res.send({
					id : talks[0]._id,
					title : talks[0].title,
					description : talks[0].description,
					username : talks[0].username,
				});
		}
		else {
			res.send('');
		}
	});
});


/**
 * Creates a new talk
 */
router.post('/createTalk', function(req, res) {
	reqToPost(req, res, function(post) {
		const user = new repo.Talk(post);
		user.save(function(err, saved) {
			if (err) {
				res.send(err);
			}
			else {
				res.json(saved);
			}
		});
	});
});


/**
 * Creates a new user
 */
router.post('/createUser', function(req, res) {
	reqToPost(req, res, function(post) {
		const user = new repo.User(post);
		user.save(function(err, saved) {
			if (err) {
				res.send(err);
			}
			else {
				res.json(saved);
			}
		});
	});
});


/**
 * Login of user
 */
router.post('/login', function(req, res) {
	reqToPost(req, res, function(post) {
		repo.User.find(post, function(err, users) {
			if (err) {
				res.send(err);
			}
			else if (users.length) {
				res.send(users[0]);
			}
			else {
				res.send('');
			}
		});
	});
});


module.exports = router;