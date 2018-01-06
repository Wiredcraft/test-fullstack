
/**
 * Mongoose is used to communicate with MongoDB
 */
const mongoose = require('mongoose');

const dbName = 'testfullstack';

mongoose.connect('mongodb://localhost/'+dbName);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const talkSchema = mongoose.Schema({
	title : String,
	description : String,
	username : String,
});

exports.Talk = mongoose.model('Talk', talkSchema);

const userSchema = mongoose.Schema({
	username : String,
	password : String,
});

exports.User = mongoose.model('User', userSchema);


