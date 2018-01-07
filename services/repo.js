
/**
 * Mongoose is used to communicate with MongoDB
 */
const mongoose = require('mongoose');

const dbName = 'testfullstack';

mongoose.connect('mongodb://localhost/'+dbName);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Talks
const talkSchema = mongoose.Schema({
	title : String,
	description : String,
	username : String,
});
exports.Talk = mongoose.model('Talk', talkSchema);

// Users
const userSchema = mongoose.Schema({
	username : String,
	password : String,
});
exports.User = mongoose.model('User', userSchema);

// Votes
const voteSchema = mongoose.Schema({
	username : String,
	talkId : String,
});
exports.Vote = mongoose.model('Vote', voteSchema);
