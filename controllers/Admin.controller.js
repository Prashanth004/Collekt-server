const Admin = require('../models/admin');

exports.admin_register = function (req, res, next) {
	var personInfo = req.body;

	if (!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf) {
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			Admin.findOne({ email: personInfo.email }, function (err, data) {
				if (!data) {
					var c;
					Admin.findOne({}, function (err, data) {

						var newPerson = new Admin({

							email: personInfo.email,
							username: personInfo.username,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf
						});

						newPerson.save(function (err, Person) {
							if (err) { res.status(400).send({ success: 0, msg: err }) }
						});

					}).sort({ _id: -1 }).limit(1);
					res.send({ "Success": "You are regestered,You can login now." });
				} else {
					res.send("Email is already used.");
				}

			});
		} else {
			res.send("password is not matched");
		}
	}
};

exports.admin_logout = function (req, res, next) {
	req.logout();
	res.send({ success: 1, msg: "logout successful" })
};

exports.admin_dash_board = function (req, res, next) {
	if (!req.user) {

		res.status(403).send({ success: 0, msg: "Only Admin can access this" })
	}
	else {

		Admin.find({ "_id": req.user._id }, function (err, data) {
			if (err) { res.status(400).send({ type: 'Not admin', msg: 'You are not admin' }); }
			return res.render('../views/html_files/admin.html');
		})
	}

};

exports.admin_login_view = function (req, res, next) {

	return res.render('../views/html_files/login.html');
};