var express = require('express');
var session = require('express-session')
var router = express.Router();
var productController = require('../controllers/productController');
var homeController = require('../controllers/homeController');
var loginController = require('../controllers/loginController');
var registerController = require('../controllers/registerController');
var emailController = require('../controllers/emailController');
var furnitureController = require('../controllers/furnitureController');
var checkoutController = require('../controllers/checkoutController');
var logoutController = require('../controllers/logoutController');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

/* GET home page. */
router.get('/*', function (req, res, next) {
    res.locals.data = req.session.userSession;
    next();
});
router.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: 'somesecret', 
    cookie: { maxAge: 60000 }}));
 
router.get('/', homeController.home);
router.get('/home', homeController.home);

// PRODUCT
router.get('/product', productController.product_list);

router.get('/product/single/:id', productController.product_detail);

router.get('/products', productController.product_list);


// LOGIN

router.get('/login', loginController.login);
passport.use(new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'username',
    passwordField: 'password'
},
    function (req, usernameField, passwordField, done) {
        User.findOne({ username: usernameField }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, req.flash('message', 'Incorrect username.'));
            }
            if (!user.validPassword(passwordField)) {
                return done(null, false, req.flash('message', 'Incorrect password.'));
            }

            var sessData = req.session;
            sessData.userSession = user;

            return done(null, user);
        });

    }
));
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }),
    function (req, res) {
        // set session
       
        res.redirect('/');
    });
//router.post('/login', loginController.postLogin)


// LOGOUT
router.get('/logout', logoutController.logout);

//REGISTER
router.get('/register', registerController.register);
router.post('/register', registerController.postRegister);

//MAIL
router.get('/mail', emailController.email);

//FURNITURE
router.get('/furniture', furnitureController.furniture);

//CHECKOUT
router.get('/checkout', checkoutController.checkout);




module.exports = router;
