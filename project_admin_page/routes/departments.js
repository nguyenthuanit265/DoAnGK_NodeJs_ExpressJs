var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/department', function (req, res, next) {
    res.render('department/index');
});
router.get('/department/add', function (req, res, next) {
    res.render('department/add');
});


router.get('/department/edit', function (req, res, next) {
    res.render('department/edit');
});




module.exports = router;
