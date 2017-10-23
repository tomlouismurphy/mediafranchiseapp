const mongoose = require('mongoose');

const movieSamSchema = new mongoose.Schema({
	adult: Boolean,
	belongs_to_collection: null, // or Object
	budget: Number,
	genres: [{
		id: Number,
		name: String
	}],
	id: Number,
	imdb_id: String, // or null (minLength: 9; maxLength: 9; pattern: ^tt[0-9]{7})
	original_language: String,
	original_title: String,
	overview: String, // or null
	popularity: Number,
	poster_path: String, // or null
	production_companies: [{
		name: String,
		id: Number
	}],
	production_countries: [{
		iso_3166_1: String,
		name: String
	}],
	release_date: String, // format: date
	revenue: Number,
	runtime: Number, // or null
	spoken_languages: [{
		iso_639_1: String,
		name: String
	}],
	status: String,
	tagline: String, // or null
	title: String,
	vote_average: Number,
	vote_count: Number
})



module.exports = mongoose.model('Movie', movieSamSchema);
