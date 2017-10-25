const mongoose = require('mongoose');

const movieSamSchema = new mongoose.Schema({
	genres: [{
		id: Number,
		name: String
	}],
	id: Number,
	original_language: String,
	overview: String, // or null
	popularity: Number,
	poster_path: String, // or null
	release_date: String, // format: date
	title: String,
})



module.exports = mongoose.model('Movie', movieSamSchema);
