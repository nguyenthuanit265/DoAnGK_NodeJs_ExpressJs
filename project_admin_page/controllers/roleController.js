const Role = require('../models/role');
const async = require('async');



exports.getList = (req, res, next) => {
    Role.find({}, function (err, roles) {
        res.render('role/index', { roles: roles });
    })

}

exports.getFormAdd = (req, res, next) => {
    res.render('role/add');
}

exports.postAdd = (req, res, next) => {

    let name = req.body.name;
    let description = req.body.description;
    let role = new Role({
        name: name,
        description: description
    });

    role.save(err => {
        if (err) throw err;
        console.log('Role Updated....!');
        res.redirect('/admin/role');
    });

}

exports.getEdit = (req, res, next) => {
    let id = req.params.id;
    console.log("id role edit: " + id);
    Role.findById(id, function (err, role) {

        res.render('role/edit', { role: role });
    })

}

exports.postEdit = (req, res, next) => {
    // let id = req.body.id;
    // let name = req.body.name;
    // let description = req.body.description;
    // let role = new Role({
    //     _id: id,
    //     name: name,
    //     description: description
    // });
    // role.save(err => {
    //     if (err) throw err;
    //     console.log('Role Updated....!');
    //     res.redirect('/admin/role');
    // });

    const query = Role.findById({ _id: req.body.id });
    query.exec(function (err, result) {
        if (err) throw err;
        // change old value with new
        result.name = req.body.name;
        result.description = req.body.description;
        // save updated results
        result.save(err => {
            if (err) throw err;
            console.log('Role Updated....!');
            res.redirect('/admin/role');
        });
    });
}


// exports.getDelete = (req,res,next) => {
//     let id=req.body.id;
//     Role.findByIdAndRemove({_id:id}).exec(function(err,result){
//         if (err) throw err;
//         console.log('Role Deleted....!');
//         res.redirect('/admin/role');
//     })
// }
exports.deleteById = (req,res,next) => {
    const query = Role.findByIdAndDelete({_id:req.params.id});
    query.exec(function(err,result){
        if (err) throw err;
        console.log('Role deleted....!');
        res.redirect('/admin/role');
    })
}