var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/product', function(req, res, next) {
  res.render('product/index');
});
router.get('/product/add', function(req, res, next) {
  res.render('product/add');
});
router.get('/product/edit', function(req, res, next) {
  res.render('product/edit');
});

module.exports = router;
