const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user.js');
const Admin = require('../models/admin')
const Token = require('../models/token');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        if (user) {
            done(null, user);
        }
        else {
            Admin.findById(id).then((user) => {
                done(null, user)
            })
        }
    });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: 'https://collekt.bookmane.in/auth/google/redirect'
    }, (accessToken, refreshToken, email, done) => {
    
        var currentdate = new Date();
        var datetime = "Last Sync: " + currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        User.findOne({ email: email.emails[0].value }).then((currentUser) => {
            if (currentUser) {
                // already have this user
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    password: email.id,
                    passwordConf: email.id,
                    username: email.displayName,
                    email: email.emails[0].value,
                    profilePicture: email._json.image.url,
                    date: datetime,
                    plan: "A",
                    active: 1,
                    payment: 0,
                    autocollect:1,
                    thumbnail: email._json.image.url
                }).save().then((newUser) => {
                    var token = new Token({ _userId: User._id, token: crypto.randomBytes(16).toString('hex') });
                    token.save(function (err) {
                        if (err) { return res.status(500).send({ msg: err.message }); }

                        // Send the email
                        var transporter = nodemailer.createTransport({ service: 'Gmail', auth: { user: keys.gmailDetails.mail, pass: keys.gmailDetails.password } });
                        var mailOptions = { from: 'no-reply@Konectr.in', to: User.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/auth/confirmation\/' + token.token + '.\n' };
                        transporter.sendMail(mailOptions, function (err) {
                            if (err) { return res.status(500).send({ msg: err.message }); }
                            res.status(200).send('A verification email has been sent to ' + user.email + '.');
                        });
                    });

                    done(null, newUser);
                });
            }
        });
    })
);
var LocalStrategy = require('passport-local').Strategy;

// Express/Passport setup here...

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        User.findOne({ email: email }).then((User) => {
            if (User) {

                if (User.password == password) {
                    done(null, User);
                }
                else {
                    return done(null, false, { message: 'Incorrect email or password.' });

                }
            }

        });
        Admin.findOne({ email: email }).then((Admin) => {
            if (Admin) {
                if (Admin.password == password) {
                    done(null, Admin);
                }
            }
            else {
                return done(null, false, { message: 'Incorrect email or password.' });
            }
        })

    })
);



