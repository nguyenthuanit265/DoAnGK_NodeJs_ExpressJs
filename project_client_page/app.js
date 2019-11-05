var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var productRouter = require('./routes/product');
var singleRouter = require('./routes/single');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var mailRouter = require('./routes/mail');
var furnitureRouter = require('./routes/furniture');
var checkoutRouter = require('./routes/checkout');
var short_codesRouter = require('./routes/short-codes');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/product', productRouter);
app.use('/single', singleRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/mail', mailRouter);
app.use('/furniture', furnitureRouter);
app.use('/checkout', checkoutRouter);
app.use('/short-codes', short_codesRouter);
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
