const express = require('express');
const router = express.Router();
const request = require('request');
const Movies = require('../models/movies');
const Users = require('../models/user');
const Characters = require('../models/characters');
const Actors = require('../models/actors');

//Sort function to compare all movies in the database in alphabetical order
const compare = (a,b) => {
	if (a.name < b.name)
		return -1;
	if (a.name > b.name)
		return 1;
	return 0;
};

//generates index of 440 movies on movie index page
router.get('/', (req, res) => {
	Movies.find((err, movies) => {
		movies.sort(compare);
		res.render('movies/index', {movies: movies});
	})
});

//route to post a new movie
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

router.get('/newchar', (req, res) => {
	res.render('movies/newcharacter');
});


router.post('/newchar', (req, res) => {
	//ensures that individual characters are not added to the database multiple times
	Characters.findOne({name: req.body.name}, (err, duplicate) => {
		if (err) {
			res.send('error');
		} else if (duplicate){
			console.log(duplicate);
			res.send('This character is already in our database!')
		} else {
			Characters.create(req.body, (err, newCharacter) => {
				if (err) {
					res.send('error');
				} else {
					res.redirect('back')
				}
			})
		}
	})
})

router.get('/newactor', (req, res) => {
	res.render('movies/newactor');
});

router.post('/newactor', (req, res) => {
	//ensures that individual actors are not added to the database multiple times
	Actors.findOne({name: req.body.name}, (err, duplicate) => {
		if (err) {
			res.send('error');
		} else if (duplicate){
			console.log(duplicate);
			res.send('This character is already in our database!')
		} else {
			Actors.create(req.body, (err, newActor) => {
				if (err) {
					res.send('error');
				} else {
					res.redirect('back')
				}
			})
		}
	})
})

router.get('/:index', (req, res) => {
	req.params.index = parseInt(req.params.index);
	Movies.find((err, movies) => {
		let ticker = 0;
		for (let i = 0; i < movies.length; i++){
			//if a movie is found with the proper id, shows page
			//if not, redirects to movie index
			if (movies[i].id === req.params.index){
				res.render('movies/show', {movie: movies[i]});
			} else {
				ticker++;
				if (ticker === movies.length){
					res.redirect('movies/')
				}
			}
		}
	})
});

router.get('/:index/addactor', (req, res) => {
	Movies.findOne({id: req.params.index}, (err, foundMovie) =>{
		res.render('movies/addactors', {movie: foundMovie});
	})
});

router.get('/:index/addchar', (req, res) => {
	Movies.findOne({id: req.params.index}, (err, foundMovie) =>{
		res.render('movies/addcharacters', {movie: foundMovie});
	})
});

router.put('/:index', (req, res) => {
	console.log(req.session.username);
	//ensures that a user is checked in before they edit a movie page
	Users.findOne({username: req.session.username}, (err, myAccount) => {
		if (err) {
			console.log('error');
		} else if (myAccount) {
			const emptyArray = {};
			//logs a movie rating and saves it to a user's profile page
			Movies.findOne({id: req.params.index}, (err, currentMovie) => {
				if (err) {
					console.log('error');
				} else if (typeof req.body.rating === 'string') {
					let ticker = 0;
					for (let i = 0; i < myAccount.ratedMovies.length; i++) {
						if (myAccount.ratedMovies[i].movie === currentMovie.name) {
							ticker++;
							myAccount.ratedMovies[i].rating = req.body.rating;
							myAccount.save();
						} else {
							;
						}
					}
					if (ticker === 0) {
						console.log('this is' + req.body.rating);
						myAccount.ratedMovies.push(emptyArray);
						myAccount.ratedMovies[myAccount.ratedMovies.length - 1].rating = req.body.rating;
						myAccount.ratedMovies[myAccount.ratedMovies.length - 1].movie = currentMovie.name;
						console.log(myAccount.ratedMovies);
						myAccount.save();
					} else {
						;
					}
				} else {
					console.log('no add');
				}
			})
			//saves a comment with a user's name on the movie page
			Movies.findOne({id: req.params.index}, (err, foundMovie) => {
				if (typeof req.body.newcomment === 'string'){
					foundMovie.comments.push({username: req.session.username, comment: req.body.newcomment});
					foundMovie.save();
					res.redirect('back');
				} else {
					res.redirect('back');
				}
			})
		} else {
			res.redirect('../users/login');
		}
	})
});

//runs check to see if character exists in main database, if so, adds to individual movie page
router.put('/:index/addchar', (req, res) => {
	Movies.findOne({id: req.params.index}, (err, foundMovie) => {
		if (err) {
			res.send('error');
		} else {
			Characters.findOne({name: req.body.name}, (err, foundCharacter) => {
				if (err) {
					res.send('error');
				} else if (foundCharacter) {
					console.log(foundCharacter);
					foundMovie.characters.push(foundCharacter);
					console.log(foundMovie.characters);
					foundMovie.save();
					res.redirect('back');
				} else {
					res.send('Please add this character to our main database first!')
				}
			})
		}
	})
});

//runs check to see if actor exists in main database, if so, adds to individual movie page

router.put('/:index/addactor', (req, res) => {
	Movies.findOne({id: req.params.index}, (err, foundMovie) => {
		if (err) {
			res.send('error');
		} else {
			Actors.findOne({name: req.body.name}, (err, foundActor) => {
				if (err) {
					res.send('error');
				} else if (foundActor) {
					foundMovie.cast.push(foundActor);
					foundMovie.save();
					res.redirect('back');
				} else {
					res.send('Please add this actor to our main database first!')
				}
			})
		}
	})
});

module.exports = router;