var express = require('express');
var router = express.Router();

router.get('', function(req, res, next) {
  res.render('product/index', { title: 'Best Store a Ecommerce Online Shopping Category Flat Bootstrap Responsive Website Template | Home :: w3layouts' });
});
module.exports = router;
