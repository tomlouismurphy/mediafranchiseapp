const mongoose = require('mongoose');

const tvSchema = new mongoose.Schema({
	backdrop_path: String, // or null
	created_by: [{
		id: Number,
		name: String,
		gender: Number, // or null
		profile_path: String
	}],
	episode_run_time: [Number],
	first_air_date: String,
	genres: [{
		id: Number,
		name: String
	}],
	homepage: String,
	id: Number,
	in_production: Boolean,
	languages: [String],
	last_air_date: String,
	name: String,
	networks: [{
		id: Number,
		name: String
	}],
	number_of_episodes: Number,
	number_of_seasons: Number,
	origin_country: [String],
	original_language: String,
	original_name: String,
	overview: String,
	popularity: Number,
	poster_path: String, // or null
	production_companies: [{
		name: String,
		id: Number
	}],
	seasons: [{
		air_date: String,
		episode_count: Number,
		id: Number,
		poster_path: String, // or null
		season_number: Number
	}],
	status: String,
	type: String,
	vote_average: Number,
	vote_count: Number
})



module.exports = mongoose.model('TV', tvSchema);
