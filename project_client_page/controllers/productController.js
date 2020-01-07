const Product = require('../models/product');
const async = require('async');
const Handlebars = require('handlebars-helpers')();
// Handlebars.registerHelper('eachData', function (context, options) {
//   var fn = options.fn, inverse = options.inverse, ctx;
//   var ret = "";

//   if (context && context.length > 0) {
//     for (var i = 0, j = context.length; i < j; i++) {
//       ctx = Object.create(context[i]);
//       ctx.index = i;
//       ret = ret + fn(ctx);
//     }
//   } else {
//     ret = inverse(this);
//   }
//   return ret;
// });

// Handlebars.registerHelper("math", function (lvalue, operator, rvalue, options) {
//   lvalue = parseFloat(lvalue);
//   rvalue = parseFloat(rvalue);

//   return {
//     "+": lvalue + rvalue
//   }[operator];
// });
exports.product_list = function (req, res, next) {
  let key = req.query.key;
  let type = req.query.type;
  let page = Number(req.query.page);
  if (key === 'men') {
    Product.find({ 'name': new RegExp('NAM', 'i') })
      .exec(function (err, list_products) {
        if (err) { return next(err); }
        //Successful, so render
        // res.redirect('/product');
       
          res.render('product', { title: 'Product List', product_list: list_products});
        

      });
  }
  else if (key === 'man') {
    Product.find({ 'name': new RegExp('NỮ', 'i') })
      .exec(function (err, list_products) {
        if (err) { return next(err); }
        //Successful, so render
        // res.redirect('/product');
      
          res.render('product', { title: 'Product List', product_list: list_products});
        

      });
  }
  else if (key === 'man' && type === 'shoes') {

    Product.find({ 'name': { $in: ['NAM', 'GIÀY'] } })
      .exec(function (err, list_products) {
        if (err) { return next(err); }
        //Successful, so render
        // res.redirect('/product');
        
          res.render('product', { title: 'Product List', product_list: list_products });
        

      });
  }

  else if (key === 'man' && type === 't-shirt') {
    Product.find({ 'name': { $in: ['NAM', 'ÁO'] } })
      .exec(function (err, list_products) {
        if (err) { return next(err); }
        //Successful, so render
        // res.redirect('/product');
        
          res.render('product', { title: 'Product List', product_list: list_products});
      

      });
  }



  let action = req.query.act;
  if (action === 'asc') {
    Product.find({})
      .sort([['price', 'ascending']])
      .exec(function (err, list_products) {
        if (err) { return next(err); }
        //Successful, so render
        // res.redirect('/product');
       
          res.render('product', { title: 'Product List', product_list: list_products});
        

      });
  } else if (action === 'desc') {
    Product.find({})
      .sort([['price', 'descending']])
      .exec(function (err, list_products) {
        if (err) { return next(err); }
        //Successful, so render
        // res.redirect('/product');
       
          res.render('product', { title: 'Product List', product_list: list_products});
        

      });
  } else if (action === 'nameaz') {
    Product.find({})
      .sort([['name', 'ascending']])
      .exec(function (err, list_products) {
        if (err) { return next(err); }
        //Successful, so render
        // res.redirect('/product');
       
          res.render('product', { title: 'Product List', product_list: list_products});
        

      });
  } else if (action === 'nameza') {
    Product.find({})
      .sort([['name', 'descending']])
      .exec(function (err, list_products) {
        if (err) { return next(err); }
        //Successful, so render
        // res.redirect('/product');
        
       
          
          res.render('product', { title: 'Product List', product_list: list_products, pagination: pages, last_page: page_size });
        

      });
  } else {
    Product.find({}).skip(6 * page - 6).limit(6)
      .exec(function (err, list_products) {

        if (err) { return next(err); }
        //Successful, so render

        //  if(6 * page - 6 ===0){
        //   page=1;
        // }

        Product.count({}, function (err, count) {
          console.log("Number of users:", count);
          let pages = [1];
          let page_size = Math.ceil(count / 6);
          for (let index = 2; index <= page_size; index++) {

            pages.push(index);
          }
          res.render('product', { title: 'Product List', product_list: list_products, pagination: pages, last_page: page_size });
        })



      });

  }

};

// Display detail page for a specific book.
exports.product_detail = function (req, res, next) {

  var id = req.params.id;

  async.parallel({
    product: function (callback) {
      Product.findById(id)
        .exec(callback);
    }
  }, function (err, results) {
    if (err) { return next(err); }
    if (results.product == null) { // No results.
      var err = new Error('Product not found');
      err.status = 404;
      return next(err);
    }
    // Successful, so render.
    res.render('single', { title: 'product Detail', product: results.product });


  }


  );

};