const mongoose = require('mongoose');
const request = require('request');
const Movie = require('./movies');

const CharacterSchema = new mongoose.Schema({
	name: String,
	movie: [Movie.schema]
})

module.exports = mongoose.model('Character', CharacterSchema);