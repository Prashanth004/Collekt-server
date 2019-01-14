const User = require('../models/user');
const Admin = require('../models/admin')
const Token = require('../models/token');
var express = require('express')
const passport = require('passport');
const keys = require('../config/keys');
const io = require('../app')
var crypto = require('crypto');
var nodemailer = require('nodemailer');




exports.user_login_view = function (req, res, next) {
	res.status(401).send({ success: 0, msg: "You should login" })
};
exports.user_register_view = function (req, res, next) {
	return res.status(200).render('register.html');
};

exports.get_allusers = function (req, res, next) {

	if (!req.user) {
		res.status(403).send({ success: 0, msg: "login as Admin" })
	}
	else {
		Admin.find({ "_id": req.user._id }, function (err, data) {
			if (err) { res.status(403).send({ type: 'Not admin', msg: 'You are not admin' }); }
			User.find(function (err, product) {
				if (err) res.status(400).send(err);
				res.status(200).send({
					success: 1,
					data: product
				});
			})
		})
	}



}



exports.user_register = function (req, res, next) {
	var personInfo = req.body;
	if (!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf) {
		res.status(400).send({ success: 0, msg: "values in required fields missing" });
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({ email: personInfo.email }, function (err, data) {
				if (!data) {
					var newPerson = new User({
						email: personInfo.email,
						username: personInfo.username,
						password: personInfo.password,
						passwordConf: personInfo.passwordConf,
						date: personInfo.date,
						plan: personInfo.plan,
						active: personInfo.active,
						payment: personInfo.pay,
						autocollect:personInfo.autocollect
					});

					newPerson.save(function (err, newPerson) {
						if (err) { return res.status(500).send({ success: 0, msg: err.message }); }
						var token = new Token({ _userId: newPerson._id, token: crypto.randomBytes(16).toString('hex') });
						token.save(function (err) {
							if (err) { return res.status(500).send({ msg: err.message }); }

							// Send the email
							var transporter = nodemailer.createTransport({
								service: 'gmail',
								auth: {
									user: 'cprashanth002@gmail.com',
									pass: 'prash#08119'
								}
							});
							var mailOptions = {
								from: '"Prashanth" <cprashanth004@gmail.com>',
								to: newPerson.email,
								subject: 'Account Verification Token',
								text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/auth/confirmation\/' + token.token + '.\n'
							};
							transporter.sendMail(mailOptions, function (err) {
								if (err) { return res.status(500).send({ msg: err.message }); }
								res.status(201).send({ success: 1, msg: 'A verification email has been sent to ' + newPerson.email + '.' });
							});
						});


					})


				} else {
					res.status(450).send({ Success: 0, msg: "Email is already used." });
				}

			});
		} else {
			res.status(400).send({ Success: 0, msg: "password is not matched" });
		}
	}
};

exports.get_user = function (req, res, next) {
	if (!req.user) {

		res.status(403).send({ sucess: 0, msg: "login as admin" })
	}
	else {
		Admin.find({ "_id": req.user._id }, function (err, data) {
			if (err) { res.status(403).send({ success: 0, msg: 'You are not admin' }); }
			User.findOne({ _id: req.params.id }, function (err) {
				if (err) { return res.status(500).send({ msg: err.message }); }
				res.status(200).send({
					success: 1,
					data: User
				})

			})
		})
	}
}



exports.user_logout = function (req, res, next) {
	req.logout();

	
	res.status(200).send({
		success: 1
	})
};

exports.user_update = function (req, res, next) {
	if (!req.user) {
		res.status(403).send({ success: 0, msg: "login as Admin" })
	}
	else {
		Admin.find({ "_id": req.user._id }, function (err, data) {
			if (err) { res.status(403).send({ success: 0, msg: 'You are not admin' }); }
			User.findByIdAndUpdate({ "_id": req.params.id }, { $set: { "active": req.body.active } }, function (err, product) {
				if (err) res.status(500).send({ success: 0, msg: "problem with database" })
				res.status(200).send({
					succcess: 1,
					data: product
				});
			});
		})
	}
}
exports.user_update = function (req, res, next) {
	if (!req.user) {
		res.status(403).send({ success: 0, msg: "login as Admin" })
	}
	else {
			User.findByIdAndUpdate({ "_id": req.params.id }, { $set: { "autocollect": req.body.autocollect } }, function (err, product) {
				if (err) res.status(500).send({ success: 0, msg: "problem with database" })
				res.status(200).send({
					succcess: 1,
					data: product
				});
			});

	}
}
exports.test_user = function (req, res) {
    if (!req.user) {

        res.status(401).send({
            login_status: 0,
            active_status: 0

        })
    }
    else {
		res.status(200).send(req.user)

    }

};


exports.user_delete = function (req, res, next) {
	if (!req.user) {
		res.status(403).send({ success: 0, msg: "login as Admin" })
	}
	else {
		Admin.find({ "_id": req.user._id }, function (err, data) {
			if (err) { res.status(403).send({ success: 0, msg: 'You are not admin' }); }
			User.findByIdAndRemove({ "_id": req.params.id }, { $set: { "active": req.body.active } }, function (err, product) {
				if (err) res.status(500).send({ success: 0, msg: "problem with database" })
				res.status(200).send({
					succcess: 1,
					data: product
				});
			});
		})
	}
}




