const mongoose = require('mongoose');
const Movie = require('./movies');

const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	name: String,
	email: String,
	ratedMovies: [{
		movie: String,
		rating: Number
	}]
})

module.exports = mongoose.model('User', UserSchema);