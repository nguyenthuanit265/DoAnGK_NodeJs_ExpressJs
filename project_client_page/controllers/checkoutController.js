const Product = require('../models/product');
var Cart = require('../models/cart');
exports.checkout = function(req,res,next){
    if(!req.session.cart) {
        return res.render('checkout', { title: 'Best Store', products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('checkout', { title: 'Best Store', products: cart.generateArray(), totalPrice: cart.totalPrice });
};

exports.product_remove = function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/checkout');
};

