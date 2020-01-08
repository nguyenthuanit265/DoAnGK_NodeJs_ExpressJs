const User = require('../models/user');
const Role = require('../models/role');

exports.getList = (req, res, next) => {
    User.find({ isDelete: true }).populate('role').exec(function (err, users) {

        res.render('user/index', { users: users })
    })
}


exports.getFormAdd = (req, res, next) => {
    Role.find({}).exec(function (err, roles) {
        res.render('user/add', { roles: roles });
    })
}

exports.getEdit = (req, res, next) => {
    var id = req.params.id;
    console.log('id edit user: ' + id);
    User.findById(id).populate('role').exec(function (err, user) {
        Role.find({}, function (err, roles) {
            res.render('user/edit', { user: user, roles: roles });
        })

    })

}
exports.postAdd = (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let role = req.body.role;
    let userAdd = new User({
        username: username,
        email: email,
        password: password,
        role: role,
        isDelete: true
    });

    userAdd.save(err => {
        if (err) throw err;
        console.log('User saved....!');
        res.redirect('/admin/user');
    });

}

exports.postEdit = (req, res, next) => {
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
        result.isDelete = true;
        // save updated results
        result.save(err => {
            if (err) throw err;
            console.log('User Updated....!');
            res.redirect('/admin/user');
        });
    });

}

exports.deleteById = (req, res, next) => {
    const query = User.findById({ _id: req.params.id });
    query.exec(function (err, result) {
        if (err) throw err;
        result.isDelete = false;
        result.save(err => {
            if (err) throw err;
            console.log('User deleted....!');
            res.redirect('/admin/user');
        });

    })
}

exports.getListDeleted = (req, res, next) => {
    User.find({ isDelete: false }).populate('role').exec(function (err, users) {

        res.render('user/is-delete', { users: users })
    })
}

exports.restore = (req, res, next) => {
    var id = req.params.id;
    console.log('id restore user: ' + id);
    const query = User.findById({ _id: req.params.id });
    query.exec(function (err, result) {
        if (err) throw err;
        result.isDelete = true;
        result.save(err => {
            if (err) throw err;
            console.log('User deleted....!');
            res.redirect('/admin/user');
        });

    })

}