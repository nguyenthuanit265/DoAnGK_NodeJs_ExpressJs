require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var flash = require("connect-flash");
var session = require('express-session');
var bcrypt = require('bcryptjs');
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/apiRouter');
const Handlebars = require('handlebars-helpers');
var methodOverride = require('method-override');
var User = require('./models/user');
var cors = require('cors')
// require('./config/passport')(passport);
const { ensureAuthenticated, forwardAuthenticated } = require('./config/auth');
// var loginController = require('./controllers/loginController');
var app = express()
// app.use(cors()) // all


// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
//Set up mongoose connection
var mongoDB = 'mongodb+srv://demo:1234AbCd@cluster0-c9v9b.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(process.env.URL_DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport initialize
app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
//flash
app.use(flash());

//session
//app.set('trust proxy', 1) // trust first proxy

app.enable('trust proxy'); // add this line
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  proxy: true, // add this line
  cookie: {
    secure: true,
    maxAge: 3600000,
    //store: new MongoStore({ url: config.DB_URL })
  }
}));

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});
app.use('/admin', indexRouter);
function adminIsLoggedIn(req, res, next) {

  if (req.originalUrl === '/admin/login')
    return next();

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.render('login/index',{ layout: '' });
}
app.use('/api', cors(), apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('myError/404', { layout: '' });
});

module.exports = app;
