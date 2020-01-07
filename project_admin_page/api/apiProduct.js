'use strict';

const Product = require('../models/product');


exports.product_list = function (req, res, next) {
    Product.find().then((product) => {
        res.send({product});
      }, (e) => {
        res.status(400).send(e);
      });
  };

exports.getList = (req,res,next) =>{
    Product.find({}).limit(8)
    .exec(function (err, list_products) {

      if (err) { res.status(400).send(err); }
     
      res.send({list_products});
    });

}