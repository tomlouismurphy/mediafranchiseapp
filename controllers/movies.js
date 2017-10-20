const express = require('express');
const router = express.Router();
const movies = require('../models/movies');

router.get('/', (req, res) => {
	res.render('movies/index', {movies: movies});
})

router.get('/:index', (req, res) => {
	res.render('movies/show', {movie: movies[req.params.index]});
})

module.exports = router;