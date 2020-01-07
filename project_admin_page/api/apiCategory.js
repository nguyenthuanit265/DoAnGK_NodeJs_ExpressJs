'use strict';

const Category = require('../models/category');


exports.getList = function (req, res, next) {
    Category.find().then((category) => {
        res.send({category});
      }, (e) => {
        res.status(400).send(e);
      });
  };