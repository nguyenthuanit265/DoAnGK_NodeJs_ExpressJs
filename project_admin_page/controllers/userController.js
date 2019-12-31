const User = require('../models/user');
const Role = require('../models/role');

exports.getList = (req,res,next) => {
    User.find({}).populate('role').exec(function(err,users){
       
        res.render('user/index',{users:users})
    })
}


exports.getFormAdd = (req,res,next) => {
    Role.find({}).exec(function(err,roles){
        res.render('user/add',{roles:roles});
    })
}

exports.getEdit = (req,res,next) => {
    var id = req.params.id;
    console.log('id edit user: ' + id);
    User.findById(id).populate('role').exec(function(err,user){
        Role.find({},function(err,roles){
            res.render('user/edit',{user:user, roles:roles});
        })
        
    })
    
}
exports.postAdd =(req,res,next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password=req.body.password;
    let role=req.body.role;
    let userAdd = new User({
        username: username,
        email: email,
        password: password,
        role: role
    });

    userAdd.save(err => {
        if (err) throw err;
        console.log('User saved....!');
        res.redirect('/admin/user');
    });

}

exports.postEdit = (req,res,next) => {
    // User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
    //     if (err) return next(err);
    //     res.send('Product udpated.');
    // });
    const query = User.findById({ _id: req.body.id });
    query.exec(function (err, result) {
        if (err) throw err;
        // change old value with new
        result.username = req.body.username;
        result.email = req.body.email;
        result.password = req.body.password;
        result.role = req.body.role;
        // save updated results
        result.save(err => {
            if (err) throw err;
            console.log('Usẻr Updated....!');
            res.redirect('/admin/user');
        });
    });
    
}