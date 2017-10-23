const mongoose = require('mongoose');

const disneyMovieSchema = new mongoose.Schema({
	page: Number,
	results: [{
		poster_path: String, // or null
		adult: Boolean,
		overview: String,
		release_date: String,
		genre_ids: [Number],
		id: Number,
		original_title: String,
		original_language: String,
		title: String,
		popularity: Number,
		vote_count: Number,
		vote_average: Number
	}],
	total_results: Number,
	total_pages: Number
})



module.exports = mongoose.model('DisneyMovie', disneyMovieSchema);
