const express = require('express');
const router = express.Router();
const movies = require('../models/movies');

router.get('/', (req, res) => {
	res.render('movies/index', {movies: movies});
})

module.exports = router;