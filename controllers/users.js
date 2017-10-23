const express = require('express');
const router = express.Router();
const Users = require('../models/user');

router.get('/', (req, res) => {
	res.render('users/index', {});
});

router.get('/register', (req, res) => {
	res.render('users/register', {})
});

router.post('/register', (req, res) => {
	Users.findOne({username: req.body.username}, (err, input) => {
		if (!input) {
			const password = req.body.password;
			const userDbEntry = {};
			userDbEntry.username = req.body.username;
			userDbEntry.password = password;
			Users.create(userDbEntry, (err, user) => {
				if (err) {
					res.send('error');
				} else {
					req.session.logged = true;
					req.session.username = user.username;
					res.redirect('/');
				}
			})
		} else {
			res.send('Username already in use');
		}
	})
})

module.exports = router;