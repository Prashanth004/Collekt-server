const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let adminSchema = new Schema({
	email: String,
	username: String,
	password: String,
	passwordConf: String
}),
	Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;