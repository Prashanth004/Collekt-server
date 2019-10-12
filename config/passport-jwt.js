var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('./keys');
const User = require('../models/user.js');
// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  var opts = {};
 
  opts.jwtFromRequest =  ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    // database.db.oneOrNone('select * from users where id = $1', jwt_payload.id)
    User.findOne({ id:jwt_payload._id })
    .then(function( user) {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    }).catch(function(err){
        return done(err, false);
    })
  }));
};