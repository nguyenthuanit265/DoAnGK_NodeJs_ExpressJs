var express = require('express');
var session = require('express-session')
var router = express.Router();
var productController = require('../controllers/productController');
var homeController = require('../controllers/homeController');
var loginController = require('../controllers/loginController');
var registerController = require('../controllers/registerController');
var logoutController = require('../controllers/logoutController');
var roleController = require('../controllers/roleController')
var userController = require('../controllers/userController')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var multer  = require('multer');
var upload = multer({ dest: '/tmp/'});
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



// LOGIN

// router.get('/login', loginController.login);
// passport.use(new LocalStrategy({
//     passReqToCallback: true,
//     usernameField: 'username',
//     passwordField: 'password'
// },
//     function (req, usernameField, passwordField, done) {
//         User.findOne({ username: usernameField }, function (err, user) {
//             if (err) { return done(err); }
//             if (!user) {
//                 return done(null, false, req.flash('message', 'Incorrect username.'));
//             }
//             if (!user.validPassword(passwordField)) {
//                 return done(null, false, req.flash('message', 'Incorrect password.'));
//             }

//             var sessData = req.session;
//             sessData.userSession = user;

//             return done(null, user);
//         });

//     }
// ));
// router.post('/login',
//     passport.authenticate('local', {
//         successRedirect: '/',
//         failureRedirect: '/login',
//         failureFlash: true
//     }),
//     function (req, res) {
//         // set session
       
//         res.redirect('/');
//     });
//router.post('/login', loginController.postLogin)


// LOGOUT
router.get('/logout', logoutController.logout);

//REGISTER
router.get('/register', registerController.register);
router.post('/register', registerController.postRegister);




//ROLE
router.get('/role',roleController.getList);
router.get('/role/add',roleController.getFormAdd);
router.post('/role/add',roleController.postAdd);

router.get('/role/edit/:id',roleController.getEdit);
router.post('/role/edit',roleController.postEdit);

router.get('/role/delete/:id',roleController.deleteById);

// router.get('/admin/role/delete/:id',roleController.getDelete);

// USER
router.get('/user',userController.getList);

router.get('/user/add',userController.getFormAdd);
router.post('/user/add',userController.postAdd);

router.get('/user/edit/:id',userController.getEdit);
router.post('/user/edit', userController.postEdit);

router.get('/user/delete/:id',userController.deleteById);


// PRODUCT
router.get('/product', productController.product_list);

router.get('/product/add',productController.getFormAdd);
router.post('/product/add',upload.single('file'),productController.postAdd);

router.get('/product/edit/:id', productController.getEdit);
router.post('/product/edit', productController.postEdit);

router.get('/product/delete/:id',productController.deleteById);

router.get('/product/single/:id', productController.product_detail);


module.exports = router;
