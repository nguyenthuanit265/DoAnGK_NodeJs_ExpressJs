var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/user', function(req, res, next) {
  res.render('user/index');
});
router.get('/user/add', function(req, res, next) {
  res.render('user/add');
});
router.get('/user/edit', function(req, res, next) {
  res.render('user/edit');
});

module.exports = router;
