const mongoose = require('mongoose');

const searchIdSchema = new mongoose.Schema({
	movie_results: [{ // Movie List Result Object
		poster_path: String, // or null
		adult: Boolean,
		overview: String,
		release_date: String,
		genre_ids: [Number],
		id: Number,
		original_title: String,
		original_language: String,
		title: String,
		backdrop_path: String, // or null
		popularity: Number,
		vote_count: Number,
		video: Boolean,
		vote_average: Number
	}],
	person_results: [{ // Person List Results Object
		profile_path: String, // or null
		adult: Boolean,
		id: Number, // Optional - known_for: {Movie List Result Object} OR {TV List Result Object}
		name: String,
		popularity: Number
	}],
	tv_results: [{ // TV List Result Object
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
	tv_episode_results: [Object],
	tv_season_results: [Object]
})

module.exports = mongoose.model('IdSearch', searchIdSchema);
