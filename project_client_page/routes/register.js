var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('', function(req, res, next) {
  res.render('register/index', { title: 'Best Store a Ecommerce Online Shopping Category Flat Bootstrap Responsive Website Template | Home :: w3layouts' });
});

module.exports = router;
