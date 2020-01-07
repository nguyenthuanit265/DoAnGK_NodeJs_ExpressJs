var express = require('express');
var session = require('express-session')
var router = express.Router();
var apiProduct = require('../api/apiProduct');
var apiCategory = require('../api/apiCategory');
/* GET home page. */
router.get('/*', function (req, res, next) {
    res.locals.data = req.session.userSession;
    next();
});

router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    proxy: true, // add this line
    cookie: {
        secure: true,
        maxAge: 3600000,
        //store: new MongoStore({ url: config.DB_URL })
    }
}));


router.get('/product', apiProduct.product_list);
router.get('/product/size/8', apiProduct.getList)
router.get('/product/category', apiProduct.getListByCategory)
router.get('/product/single/:id', apiProduct.productDetail);

router.get('/category', apiCategory.getList);

module.exports = router;