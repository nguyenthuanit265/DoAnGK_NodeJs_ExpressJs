var express = require('express');
var session = require('express-session')
var router = express.Router();
var productController = require('../controllers/productController');
var homeController = require('../controllers/homeController');
var categoryController = require('../controllers/categoryController');
var loginController = require('../controllers/loginController');
var registerController = require('../controllers/registerController');
var logoutController = require('../controllers/logoutController');
var roleController = require('../controllers/roleController');
var userController = require('../controllers/userController');
var billController = require('../controllers/billController');
var detailBillController = require('../controllers/detailBillController');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var multer = require('multer');
var upload = multer({ dest: '/tmp/' });
const {ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
/* GET home page. */
router.get('/*', function (req, res, next) {
    res.locals.data = req.session.userSession;
    next();
});

router.use(session({
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

router.get('/login', loginController.login);
router.post('/login', loginController.postLogin);
// LOGOUT
router.get('/logout', logoutController.logout);

//REGISTER
router.get('/register', registerController.register);
router.post('/register', registerController.postRegister);




//ROLE
router.get('/role', roleController.getList);
router.get('/role/add', roleController.getFormAdd);
router.post('/role/add', roleController.postAdd);

router.get('/role/edit/:id', roleController.getEdit);
router.post('/role/edit', roleController.postEdit);

router.get('/role/delete/:id', roleController.deleteById);

// router.get('/admin/role/delete/:id',roleController.getDelete);

// USER
router.get('/user', userController.getList);

router.get('/user/add', userController.getFormAdd);
router.post('/user/add', userController.postAdd);

router.get('/user/edit/:id', userController.getEdit);
router.post('/user/edit', userController.postEdit);

router.get('/user/delete/:id', userController.deleteById);


// PRODUCT
router.get('/product', productController.product_list);

router.get('/product/add', productController.getFormAdd);
router.post('/product/add', upload.single('file'), productController.postAdd);

router.get('/product/edit/:id', productController.getEdit);
router.post('/product/edit', productController.postEdit);

router.get('/product/delete/:id', productController.deleteById);

router.get('/product/single/:id', productController.product_detail);



// category
router.get('/category', categoryController.getList);

router.get('/category/add', categoryController.getFormAdd);
router.post('/category/add', categoryController.postAdd);

router.get('/category/edit/:id', categoryController.getEdit);
router.post('/category/edit', categoryController.postEdit);

router.get('/category/delete/:id', categoryController.deleteById);


// bill
router.get('/bill', billController.getList);

// router.get('/bill/add', categoryController.getFormAdd);
// router.post('/bill/add', categoryController.postAdd);

// router.get('/bill/edit/:id', categoryController.getEdit);
// router.post('/bill/edit', categoryController.postEdit);

router.get('/bill/delete/:id', billController.deleteById);
router.get('/bill/detail/:id', billController.detail);


// detail bill
router.get('/detail-bill', detailBillController.getList);

// router.get('/bill/add', categoryController.getFormAdd);
// router.post('/bill/add', categoryController.postAdd);

// router.get('/bill/edit/:id', categoryController.getEdit);
// router.post('/bill/edit', categoryController.postEdit);






module.exports = router;
