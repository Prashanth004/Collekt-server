const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
	email: String,
	username: String,
	password: String,
	passwordConf: String,
	profilePicture: String,
	date: String,
	plan: String,
	isVerified: { type: Boolean, default: false },
	password: String,
	active: Number,
	payment: Number,
	autocollect: Number,
}),
	User = mongoose.model('User', userSchema);

module.exports = User;


