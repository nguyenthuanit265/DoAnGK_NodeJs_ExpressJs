var User = require('../models/user');
var Role = require('../models/role');
var express=require("express"); 
var bodyParser=require("body-parser"); 
const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');

//Set up mongoose connection
var mongoDB = 'mongodb+srv://demo:1234AbCd@cluster0-c9v9b.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(process.env.URL_DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 

exports.register = (req, res, next) => {
    res.render('register', { title: 'Best Store' });
}

exports.postRegister = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let phone = req.body.phone;
    let salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);
    let user = User.findOne({ username: req.body.username },
        function (err, obj) {
            //console.log(obj);
            if (obj!==null){
                res.render('register', { title: 'Best Store', message: 'username already exist' });
            }else {
                Role.find({})
                .exec(function (err, list_roles) {
        
                    if (err) { return next(err); }
        
                    user = new User({
                        username: username,
                        email: email,
                        phone: phone,
                        password: password,
                        role: list_roles[3]
                    });
                    //console.log(user);
                    user.save(function (err, result) {
                    });
                          
                    res.redirect('/login'); 
                   
                });
            }
        });
    
  
       
    
       
       




    
}