















const router = require('express').Router();
const passport = require('passport');
const emailVarification = require('../controllers/emailVarify.controller')


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

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
      dataframe={
        refresh:1
      }
setTimeout(function(){
      io.sockets.emit('closeiframe', dataframe)
      io.sockets.emit('setPopWithHome'," ")
},500);
    return res.render('redirect.ejs')
});

router.get('/confirmation/:token', emailVarification.confirmationPost)

module.exports = router;
