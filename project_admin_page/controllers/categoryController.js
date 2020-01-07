const Category = require('../models/category');
const async = require('async');



exports.getList = (req, res, next) => {
    Category.find({}, function (err, categories) {
        res.render('category/index', { categories: categories });
    })

}

exports.getFormAdd = (req, res, next) => {
    res.render('category/add');
}

exports.postAdd = (req, res, next) => {

    let name = req.body.name;
    // let date = req.body.date;
    // console.log(date);
   
    //document.getElementById('DATE').value = today;
    let category = new Category({
        name: name
    });

    category.save(err => {
        if (err) throw err;
        console.log('category Updated....!');
        res.redirect('/admin/category');
    });

}

exports.getEdit = (req, res, next) => {
    let id = req.params.id;
    console.log("id category edit: " + id);
    Category.findById(id, function (err, category) {

        res.render('category/edit', { category: category });
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

    const query = Category.findById({ _id: req.body.id });
    query.exec(function (err, result) {
        if (err) throw err;
        // change old value with new
        result.name = req.body.name;
        //result.description = req.body.description;
        // save updated results
        result.save(err => {
            if (err) throw err;
            console.log('category Updated....!');
            res.redirect('/admin/category');
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
    const query = Category.findByIdAndDelete({_id:req.params.id});
    query.exec(function(err,result){
        if (err) throw err;
        console.log('category deleted....!');
        res.redirect('/admin/category');
    })
}