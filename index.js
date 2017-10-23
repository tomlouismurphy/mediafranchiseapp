require('dotenv').config();
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const session = require('express-session');

require('./db/db');

app.use(session({
	secret:'jiminy930132$##$281834cricket',
	resave: false,
	saveUninitialized: false
}));

const movieController = require('./controllers/movies');
const userController = require('./controllers/users');
const homeController = require('./controllers/home');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));

app.use('/movies', movieController);
app.use('/users', userController);
app.use('/', homeController);

app.listen(3000, () => {
	console.log('app is listening on port 3000');
})