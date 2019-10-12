
const router = require('express').Router();
const passport = require('passport');
const emailVarification = require('../controllers/emailVarify.controller');
var jwt = require('jsonwebtoken');
var key = require('../config/keys')

var createToken = function(auth) {
    return jwt.sign({
      id: auth.id
    },key.secret,
    {
      expiresIn: 8*7*24*60*60*1000
    });
  };

var generateToken = function (req, res, next) {
    var token = createToken(req.user);
    io.sockets.emit('signindone', {
        'token' : 'JWT ' + token
    })
    return res.render('redirect.ejs',{token: 'JWT ' + token})
    // res.json({ success: 1, token: 'JWT ' + token, user:req.user });
};

var sendToken = function (req, res) {
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
};




router.get('/logout', (req, res) => {
    req.logout();
    res.send({ success: 1, msg: "logout successful" })

});



router.post('/login', passport.authenticate('local', { failWithError: true }),
    function (req, res, next) {
        // handle success
        if (req.xhr) { return res.send({ success: 1 }); }
        return res.send({ success: 1 });
    },
    function (err, req, res, next) {
        // handle error
        if (req.xhr) { return res.send(err); }
        return res.send(err);
    }
);

router.post('/admin/login', passport.authenticate('local'),
    (req, res) => {
        res.send({ success: 1, data: req.user })
    });


router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res,next) => {
    data={
		close:1,
		refresh:1
    }
    console.log("req.user : ",req.user);
    if (!req.user) {
        return res.send(401, 'User Not Authenticated');
    }

    // prepare token for API
    req.auth = {
        id: req.user.id,
        email: req.user.email,
        profilepic: req.user.profilepic,
        username: req.user.username,
        data: req.user.date,
        payment: req.user.payment,
    };

    return next();
}, generateToken, sendToken)
// 	io.sockets.emit('closeiframe', data)
//     return res.render('redirect.ejs')
// });

router.get('/confirmation/:token', emailVarification.confirmationPost)

module.exports = router;
