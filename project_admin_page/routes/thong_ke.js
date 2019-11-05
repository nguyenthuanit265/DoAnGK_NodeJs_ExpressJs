var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/thong_ke', function(req, res, next) {
  res.render('thong_ke/index');
});


module.exports = router;
