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
				id : talks[0]._id, // the id of talk is required on the front
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
 * Get user by username
 */
router.get('/checkUser/:username', function(req, res) {
	const username = req.params.username;
	repo.User.find({username:username}, function(err, users) {
		if (err) {
			res.send(err);
		}
		else if (users.length) {
			res.send({
				id : users[0]._id,
				title : users[0].title,
				description : users[0].description,
				username : users[0].username,
			});
		}
		else {
			res.send('');
		}
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


/**
 * Returns the list of votes
 */
router.get('/getVotes', function(req, res) {
	repo.Vote.find(function(err, votes) {
		if (err) {
			res.send(err);
		}
		else {
			const nVotes = [];
			for (var i = 0; i < votes.length; i++) {
				nVotes.push({
					// id : votes[i]._id,
					talkId : votes[i].talkId,
					username : votes[i].username,
				});
			}
			res.json(nVotes);
		}
	});
});


/**
 * Creates a new vote
 */
router.post('/createVote', function(req, res) {
	reqToPost(req, res, function(post) {
		const vote = new repo.Vote(post);
		vote.save(function(err, saved) {
			if (err) {
				res.send(err);
			}
			else {
				res.json(saved);
			}
		});
	});
});

module.exports = router;