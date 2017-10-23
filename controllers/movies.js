const express = require('express');
const router = express.Router();
const Movies = require('../models/movies');

router.get('/', (req, res) => {
	Movies.find((err, movies) => {
		res.render('movies/index', {movies: movies});
	})
});

router.post('/', (req, res) => {
	Movies.create(req.body, (err, newMovie) => {
		if (err) {
			res.send('error');
		} else {
			console.log(newMovie);
			res.redirect('movies/');
		}
	})
});

router.get('/new', (req, res) => {
	res.render('movies/new', {});
});

router.get('/:index', (req, res) => {
	Movies.find((err, movies) => {
		res.render('movies/show', {movie: movies[req.params.index]});
	})
});

module.exports = router;