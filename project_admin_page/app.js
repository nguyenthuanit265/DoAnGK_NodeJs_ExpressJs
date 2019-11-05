var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var rolesRouter = require('./routes/roles');
var loginRouter = require('./routes/login');
var departmentRouter = require('./routes/departments');
var productRouter = require('./routes/products');
var topProductRouter = require('./routes/topProduct');
var thong_keRouter = require('./routes/thong_ke');
var billRouter = require('./routes/bill');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', indexRouter);
app.use('/admin', usersRouter);
app.use('/admin',rolesRouter);
app.use('/admin/login',loginRouter);
app.use('/logout',loginRouter);
app.use('/admin',departmentRouter);
app.use('/admin',productRouter);
app.use('/admin',topProductRouter);
app.use('/admin',thong_keRouter);
app.use('/admin',billRouter);

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
