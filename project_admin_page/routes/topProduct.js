var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/topSeller', function(req, res, next) {
  res.render('topSeller/index');
});


module.exports = router;
