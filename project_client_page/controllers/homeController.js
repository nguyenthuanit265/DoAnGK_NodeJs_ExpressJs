var Product = require('../models/product');
var async  = require('async');
var session = require('express-session');
exports.home = (req,res,next) =>{
    Product.find({}).limit(8)
        .exec(function (err, list_products) {
  
          if (err) { return next(err); }
          //Successful, so render
         
          res.render('index', { title: 'Best Store', product_list: list_products});
        });
    
}