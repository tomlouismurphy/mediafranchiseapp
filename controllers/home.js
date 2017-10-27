const express = require('express');
const request = require('request');
const router = express.Router();
const Movies = require('../models/movies');

const movieListing = [];

//this function fits the data from our ajax call into the movie schema
const populateDatabase = () => {
    for (let i = 0; i < movieListing.length; i++){
        const movie = new Movies({name: movieListing[i].title,
                                releaseDate: movieListing[i].release_date,
                                id: movieListing[i].id,
                                overview: movieListing[i].overview,
                                poster_path: movieListing[i].poster_path,
                                popularity: movieListing[i].popularity,
                                original_language: movieListing[i].original_language,
                                crew: [],
                                cast: [],
                                characters: [],
                                comments: [],
                                director: []
                            })
        movie.save();
    }
}

//fixes the release date in the AJAX data being rendered as a string
const releaseDateToInt = () => {
    for (let i = 0; i < movieListing.length; i++){
        movieListing[i].release_date = parseInt(movieListing[i].release_date.split(/\s*\-\s*/g)[0]);
    };
};

//
const populateAjax = (url) => {
    request(url, (error, response, body) => {
        if (error){
            console.log('error');
        } else {
            const dbObject = JSON.parse(body);
            for (let i = 0; i < dbObject.results.length; i++){
                movieListing.push(dbObject.results[i]);
                if (movieListing.length === 440){
                    releaseDateToInt();
                    populateDatabase();
                }
            }
        }
    })
};

//makes AJAX call to get exactly 440 Disney movies onto our database upon the first loading of home page
router.get('/', (req, res) => {
		Movies.findOne({name: '101 Dalmatians'}, (err, foundMovie) => {
		if (foundMovie === null){
			for (i = 1; i < 23; i++){
        		const url = 'https://api.themoviedb.org/3/discover/movie?with_companies=2&page=' + i + '&include_video=false&include_adult=false&sort_by=original_title.asc&language=en-US&api_key=32589a3c15168653f4bc773880912020'
        		console.log(url);
        		populateAjax(url);
			}
		} else {
			console.log('database already exists');
		}
	})
	res.render('index', {});
})

module.exports = router;