//app.js
const express = require('express');
var socket = require('socket.io');
const passport = require('passport');
const cookieSession = require('cookie-session');
const passportSetup = require('./config/passport-setup');
const bodyParser = require('body-parser');
const product = require('./routes/Card.route'); // Imports routes for the products
const lists= require('./routes/List.router')
const user = require('./routes/user.router')
const share = require('./routes/shared.route')
const admin = require('./routes/admin.route')
const authRoutes = require('./routes/auth-routes')
const basic = require('./routes/basic.routes')
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();
const keys = require('./config/keys');
const listData = require('./controllers/List.controller')
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect('mongodb://localhost/myappdatabase');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var publicDir = require('path').join(__dirname, '/views');


var engine = require('consolidate');
app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
app.set('view engine', 'ejs');
app.use(express.static(publicDir));


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/product', product);
app.use('/list', lists);
app.use('/user', user);
app.use('/admin', admin);
app.use('/share', share);
app.use('/', basic );
// app.get('/facen')
app.use( [
  handleError
  ] );
function handleError(err,req,res,next){
  var output = {
      error: {
          name: err.name,
          message: err.message,
          text: err.toString()
      }
  };

  var statusCode = err.status || 500;
  res.status(statusCode).json(output);
}
app.get('*', function(req, res, next) {
  let err = new Error('Page Not Found');
  err.statusCode = 404;
  next(err);
});


app.use(function(err, req, res, next) {
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});


let port = 1234;
var server = app.listen(port, () => {
});

app.use(express.static('public'));

// Socket setup & pass server
io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('closeiframe',function(data){
      console.log(data);
      io.sockets.emit('closeiframe', data)
    })
    socket.on('logout', function(data){
        console.log(data);
        io.sockets.emit('logout', data);
        dataframe={
          close:1,
          refresh:1
        }
        io.sockets.emit('closeiframe', dataframe)
    });
 
 
    socket.on('list_created', function (data) {
        console.log(data);
        console.log(data.data.data)
        io.sockets.emit('list_created', data.data.data);
  
});
socket.on('deleteLst', function (data) {
  console.log(data);
  
  io.sockets.emit('deleteLst', data.ID);

});
socket.on('cardAdded',function(data){
  console.log("crad",data)
  io.sockets.emit('cardAdded', data);
})
socket.on('delete', function (data) {
 
  io.sockets.emit('delete', data.ID);

});

});
exports.io =io;


