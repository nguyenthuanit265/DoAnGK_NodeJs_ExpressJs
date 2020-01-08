var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var passport = require('passport');
var mongoose = require('mongoose');
var flash = require("connect-flash");
var session = require('express-session');
const User = require('../models/user');
var express = require('express');
var session = require('express-session')
var router = express.Router();

router.get('/*', function (req, res, next) {
    res.locals.data = req.session.userSession;
    next();
});
router.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: { maxAge: 60000 }
}));

exports.login = (req, res, next) => {
    // if (req.isAuthenticated()) {
    //     res.redirect('/admin/home');
    // }
    // else {
    //     res.render('login/index', { layout: '' });
    // }
    res.render('login/index', { layout: '' });
}



// passport.use('local-login', new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true
// },
//     function (req, email, password, done) { // callback với email và password từ html form
//         // find a user whose email is the same as the forms email
//         // we are checking to see if the user trying to login already exists
//         // tìm một user với email
//         // chúng ta sẽ kiểm tra xem user có thể đăng nhập không
//         User.findOne({ email: email }, function (err, user) {
//             if (err)
//                 return done(err);
//             // if no user is found, return the message
//             if (!user)
//                 return done(null, false, req.flash('message', 'No user found.'));
//             // if the user is found but the password is wrong
//             if (!user.validPassword(password))
//                 return done(null, false, req.flash('message', 'Oops! Wrong password.')); // thông báo lỗi chỉ này chỉ dùng khi dev
//             // all is well, return successful user
//             return done(null, user);
//         });
//     })
// );


// passport.serializeUser(function (user, done) {
//     done(null, user);
// });
// passport.deserializeUser(function (user, done) {
//     done(null, user);
// });

exports.postLogin = (req, res, next) => {
    console.log(req.body.email);
    console.log(req.body.password);
    // passport.authenticate('local', {
    //     successRedirect: '/admin/home',
    //     failureRedirect: '/admin/login',
    //     withCredentials: true,
    //     failureFlash: true,
    // }),
    //     function (req, res) {
    //         // set session

    //     }
        User.findOne({ email: req.body.email }, function (err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user){
                //return done(null, false, req.flash('message', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                res.render('login/index', { layout: '', message:'No user found.' });
           
            }
            // if the user is found but the password is wrong
            console.log(user)
            if (!user.validPassword(req.body.password)){
                //return done(null, false, req.flash('message', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                res.render('login/index', { layout: '', message:'Oops! Wrong password.' });
            }
            req.session.user = JSON.stringify(user);
            console.log(req.session.user)
            res.redirect('/admin/home');
        })
    
    
};


// passport.use('local', new  localStrategy({passReqToCallback : true}, (req, username, password, done) => {

//     loginAttempt();

//     async function loginAttempt() {

//         const client = await pool.connect()
//         try{
//             await client.query('BEGIN')
//             var pwd = await bcrypt.hash(password, 5);
//             var currentAccountsData = await JSON.stringify(client.query("SELECT * FROM public.user " +
//                 "INNER JOIN public.permission ON public.user.role = public.permission.id " +
//                 "WHERE public.user.username = '"+username+"' AND public.user.password = '"+password+"'", function(err, result) {

//                 if(err) {
//                     return done(err)
//                 }
//                 if(result.rows[0] == null){
//                     return done(null, false);
//                 }
//                 else{
//                     console.log(result.rows.length);
//                     console.log(result.rows[0].username);

//                     if (result.rows[0] && result.rows[0].username == username && result.rows[0].password == password) {
//                         if (req.body.remember) {
//                             console.log('remember')
//                             req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
//                         } else {
//                             console.log('no remember')
//                             req.session.cookie.expires = false; // Cookie expires at end of session
//                         }
//                         return done(null, result.rows[0]);
//                     } else {
//                         return done(null, false);
//                     }
//                 }
//             }))
//         }
//         catch(e){throw (e);}
//         };
//     }
// ))



// exports.postLogin(passport.authenticate('local', {
//     successRedirect: '../',
//     failureRedirect: '/product/login',
//     failureFlash: true
// }));


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