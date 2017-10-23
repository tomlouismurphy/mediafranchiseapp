const mongoose = require('mongoose');

const disneyTvSchema = new mongoose.Schema({
	page: Number,
	results: [{
		poster_path: String, // or null
		popularity: Number,
		id: Number,
		backdrop_path: String, // or null
		vote_average: Number,
		overview: String,
		first_air_date: String,
		origin_country: [String],
		genre_ids: [Number],
		original_language: String,
		vote_count: Number,
		name: String,
		original_name: String
	}],
	total_results: Number,
	total_pages: Number
})

module.exports = mongoose.model('DisneyTv', disneyTvSchema);
