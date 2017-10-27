const mongoose = require('mongoose');
const request = require('request');
const Actor = require('../models/actors');
const Character = require('../models/characters');

const movieListing = [];

const MovieSchema = new mongoose.Schema({
    name: String,
    releaseDate: Number,
    genres: [{
        id: Number,
        name: String
    }],
    id: Number,
    original_language: String,
    overview: String,
    poster_path: String,
    popularity: Number,
    crew: [String],
    cast: [Actor.schema],
    characters: [Character.schema],
    director: [String],
    comments: [{
        username: String,
        comment: String
    }]
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = mongoose.model('Movie', MovieSchema);