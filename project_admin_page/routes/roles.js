var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/role', function(req, res, next) {
  res.render('role/index');
});
router.get('/role/add', function(req, res, next) {
  res.render('role/add');
});
router.get('/role/edit', function(req, res, next) {
  res.render('role/edit');
});

module.exports = router;
