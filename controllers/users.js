const express = require('express');
const router = express.Router();
const Users = require('../models/user');
const bcrypt = require('bcrypt');

const compare = (a,b) => {
	if (a.username < b.username)
		return -1;
	if (a.username > b.username)
		return 1;
	return 0;
}

router.get('/', (req, res) => {
	console.log(req.session);
	Users.find((err, inp) => {
		if (err) {
			res.send('database error');
		} else {
			for (let i = 0; i < inp.length; i++){
				inp[i].savedUsername = inp[i].username;
				inp[i].username = inp[i].username.toLowerCase();
			}
			inp.sort(compare);
			for (let i = 0; i < inp.length; i++){
				inp[i].username = inp[i].savedUsername;
			}
			res.render('users/index', {users: inp});
		}
	})
});

router.get('/register', (req, res) => {
	res.render('users/register', {})
});

router.post('/register', (req, res) => {
	Users.findOne({username: req.body.username}, (err, input) => {
		if (!input) {
			const password = req.body.password;
			const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
			const userDbEntry = {};
			userDbEntry.username = req.body.username;
			userDbEntry.password = passwordHash;
			console.log(userDbEntry);
			Users.create(userDbEntry, (err, user) => {
				if (err) {
					res.send('error');
				} else {
					req.session.logged = true;
					req.session.username = user.username;
					req.session.save();
					res.redirect('/');
				}
			})
		} else {
			res.send('Username already in use');
		}
	})
})

router.get('/login', (req, res) => {
	res.render('users/login', {});
})

router.post('/login', (req, res) => {
	Users.find((err, inp) => {
		let ticker = 0;
		for (let i = 0; i < inp.length; i++){
			if (inp[i].username === req.body.username){
				if (bcrypt.compareSync(req.body.password, inp[i].password) === true){
					req.session.logged = true;
					req.session.username = req.body.username;
					req.session.save();
					console.log(req.session);
					res.redirect('/users');
				} else {
					res.send('Sorry, that password was incorrect.');
				}
			} else {
				ticker++;
				if (ticker === inp.length){
					res.send('That user does not appear in our database.');
				}
			}
		}
	})
});

router.get('/:id', (req, res) => {
	Users.find((err, person) => {
		if (err){
			console.log('error');
		} else {
			console.log(person);
			for (let i = 0; i < person.length; i++){
				if (person[i].username === req.params.id){
					res.render('users/profile', {person: person[i], req: req});
					return 0;
				}
			}
		}
	})
})

router.put('/:id', (req, res) => {
	Users.findOne({username: req.params.id}, (err, person) => {
		console.log(person);
		person.personalMessage = req.body.personalMessage;
		person.save();
		res.redirect('back');
	})
})

module.exports = router;