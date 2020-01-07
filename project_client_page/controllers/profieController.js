const User = require('../models/user');
var session = require('express-session');
const bcrypt = require('bcryptjs');

exports.profie = (req, res, next) => {
    res.render('profie', { title: 'Best Store',message: req.flash('message')  });
}
exports.postProfie = (req,res,next) => {
    const query = User.findById({ _id: req.body.id});
    query.exec(function (err, result)
    {
        if(err) throw err;
        result.email = req.body.email;
        result.phone = req.body.phone;
        result.save(err =>{
            if(err) throw err;
            console.log('Update...');
            res.redirect('/');
        });
    });
}
exports.postPassword = (req,res,next) => {
    let salt = bcrypt.genSaltSync(10);
    let password = req.body.password;
    let newpassword = req.body.newpassword;
    let oldpassword = req.body.oldpassword;
    newpassword = bcrypt.hashSync(newpassword, salt);
    const query = User.findById({ _id: req.body.id});
    query.exec(function (err, result)
    {
        if(err) throw err;
        if (!bcrypt.compareSync(oldpassword, password)) {
            console.log(password);
            console.log(bcrypt.hashSync(oldpassword, salt));
            console.log(oldpassword);
            res.render('profie', { title: 'Best Store', message: 'Incorrect old password' });
        }
        else{
            result.password = newpassword;
            result.save(err =>{
                if(err) throw err;
                console.log('Update...');
                res.redirect('/logout');
            });
        } 
    });
} 
