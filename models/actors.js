const mongoose = require('mongoose');
const request = require('request');
const Movie = require('./movies');

const ActorSchema = new mongoose.Schema({
	name: String,
	movie: [String]
})

module.exports = mongoose.model('Actor', ActorSchema);