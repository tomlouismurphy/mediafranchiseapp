const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
	adult: Boolean,
	also_known_as: [Object],
	biography: String,
	birthday: String, // or null
	deathday: String, // or null
	gender: Number, // 0: not set; 1: Female; 2: Male
	id: Number,
	imdb_id: String,
	name: String,
	place_of_birth: String, // or null
	popularity: Number,
})



module.exports = mongoose.model('Actor', actorSchema);
