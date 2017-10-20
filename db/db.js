const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost/franchiseapp';

mongoose.connect(connectionString);

mongoose.connection.on('connected', () => {
	console.log(connectionString + ' is operational');
})

mongoose.connection.on('error', (error) => {
	console.log(error + ' has occurred');
})

mongoose.connection.on('disconnected', () => {
	console.log('mongoose has been disconnected');
})