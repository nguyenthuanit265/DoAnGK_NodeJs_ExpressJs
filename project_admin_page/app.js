require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require("connect-flash");
var session = require('express-session');
var bcrypt = require('bcryptjs');
var indexRouter = require('./routes/index');
const Handlebars = require('handlebars-helpers');
var methodOverride = require('method-override')
var app = express()
// var usersRouter = require('./routes/users');
// var rolesRouter = require('./routes/roles');
// var loginRouter = require('./routes/login');
// var departmentRouter = require('./routes/departments');
// var productRouter = require('./routes/products');
// var topProductRouter = require('./routes/topProduct');
// var thong_keRouter = require('./routes/thong_ke');
// var billRouter = require('./routes/bill');


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
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
//flash
app.use(flash());

//session
//app.set('trust proxy', 1) // trust first proxy
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'somesecret',
  cookie: { maxAge: 60000 }
}));


app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});
app.get('/admin/login', function(req, res) {
  res.render('login/index', { layout: '' });
});
app.use('/admin', indexRouter);

// app.put('/',indexRouter);
//  app.post('/',indexRouter);
// app.delete('/',indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
