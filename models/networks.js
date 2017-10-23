const mongoose = require('mongoose');

const findNetworkSchema = new mongoose.Schema({
	id: Number,
	name: String
})

module.exports = mongoose.model('Network', findNetworkSchema);
