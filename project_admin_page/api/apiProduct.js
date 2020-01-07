'use strict';

const Product = require('../models/product');


exports.product_list = function (req, res, next) {
  let page = req.query.page;
  console.log(page);
  Product.find({}).skip(6 * page - 6).limit(6).then((list_product) => {
    res.send({ list_product });
  }, (e) => {
    res.status(400).send(e);
  });
};

exports.getList = (req, res, next) => {
  Product.find({}).limit(8)
    .exec(function (err, list_products) {

      if (err) { res.status(400).send(err); }

      res.send({ list_products });
    });

};

exports.getListByCategory = (req, res, next) => {
  let key = req.query.key;
  console.log(key);
  Product.find({ category: key }).limit(8)
    .exec(function (err, list_productsByCategory) {

      if (err) { res.status(400).send(err); }

      res.send({ list_productsByCategory });
    });

}

exports.productDetail = (req, res, next) => {
  let idProduct = req.params.id;
  console.log(idProduct);
  Product.findById({ _id: idProduct }).then((product) => {
    res.send({ product });
  }, (e) => {
    res.status(400).send(e);
  });
}
