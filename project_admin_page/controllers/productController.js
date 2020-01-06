'use strict';
const cloudinary = require('../config/ModelCloudinary')
const Product = require('../models/product');
const path =require('path')
const async = require('async');
const Category = require('../models/category')
const Handlebars = require('handlebars-helpers')();
var multer  = require('multer');
var upload = multer({ dest: '/tmp/'});
var fs = require("fs");


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


////display list product
// exports.product_list = function (req, res, next) {
//   let key = req.query.key;
//   let type = req.query.type;
//   let page = Number(req.query.page);
//   if (key === 'men') {
//     Product.find({ 'name': new RegExp('NAM', 'i') })
//       .exec(function (err, list_products) {
//         if (err) { return next(err); }
//         //Successful, so render
//         // res.redirect('/product');

//           res.render('product', { title: 'Product List', product_list: list_products});


//       });
//   }
//   else if (key === 'man') {
//     Product.find({ 'name': new RegExp('NỮ', 'i') })
//       .exec(function (err, list_products) {
//         if (err) { return next(err); }
//         //Successful, so render
//         // res.redirect('/product');

//           res.render('product', { title: 'Product List', product_list: list_products});


//       });
//   }
//   else if (key === 'man' && type === 'shoes') {

//     Product.find({ 'name': { $in: ['NAM', 'GIÀY'] } })
//       .exec(function (err, list_products) {
//         if (err) { return next(err); }
//         //Successful, so render
//         // res.redirect('/product');

//           res.render('product', { title: 'Product List', product_list: list_products });


//       });
//   }

//   else if (key === 'man' && type === 't-shirt') {
//     Product.find({ 'name': { $in: ['NAM', 'ÁO'] } })
//       .exec(function (err, list_products) {
//         if (err) { return next(err); }
//         //Successful, so render
//         // res.redirect('/product');

//           res.render('product', { title: 'Product List', product_list: list_products});


//       });
//   }



//   let action = req.query.act;
//   if (action === 'asc') {
//     Product.find({})
//       .sort([['price', 'ascending']])
//       .exec(function (err, list_products) {
//         if (err) { return next(err); }
//         //Successful, so render
//         // res.redirect('/product');

//           res.render('product', { title: 'Product List', product_list: list_products});


//       });
//   } else if (action === 'desc') {
//     Product.find({})
//       .sort([['price', 'descending']])
//       .exec(function (err, list_products) {
//         if (err) { return next(err); }
//         //Successful, so render
//         // res.redirect('/product');

//           res.render('product', { title: 'Product List', product_list: list_products});


//       });
//   } else if (action === 'nameaz') {
//     Product.find({})
//       .sort([['name', 'ascending']])
//       .exec(function (err, list_products) {
//         if (err) { return next(err); }
//         //Successful, so render
//         // res.redirect('/product');

//           res.render('product', { title: 'Product List', product_list: list_products});


//       });
//   } else if (action === 'nameza') {
//     Product.find({})
//       .sort([['name', 'descending']])
//       .exec(function (err, list_products) {
//         if (err) { return next(err); }
//         //Successful, so render
//         // res.redirect('/product');



//           res.render('product', { title: 'Product List', product_list: list_products, pagination: pages, last_page: page_size });


//       });
//   } else {
//     Product.find({}).skip(6 * page - 6).limit(6)
//       .exec(function (err, list_products) {

//         if (err) { return next(err); }
//         //Successful, so render

//         //  if(6 * page - 6 ===0){
//         //   page=1;
//         // }

//         Product.count({}, function (err, count) {
//           console.log("Number of users:", count);
//           let pages = [1];
//           let page_size = Math.ceil(count / 6);
//           for (let index = 2; index <= page_size; index++) {

//             pages.push(index);
//           }
//           res.render('product', { title: 'Product List', product_list: list_products, pagination: pages, last_page: page_size });
//         })



//       });

//   }

// };
exports.product_list = function (req, res, next) {
  Product.find({}).populate('category').exec(function (err, products) {
    if (err) throw err;
    res.render('product/index', { products: products })
  })


};
exports.getFormAdd = (req, res, next) => {
  Category.find({}).exec(function (err, categories) {
    res.render('product/add', { categories: categories });
  })
};

exports.postAdd = (req, res, next) => {
  let name = req.body.name;
  let description = req.body.description;
  let price = req.body.price;
  let category = req.body.category;
  // let image=req.body.image;
  if (!req.file) return res.send('Please upload a file')
  var file = __dirname + '/' + req.file.filename;
  // fs.rename(req.file.path, file, function(err) {
  //   if (err) {
  //     console.log(err);
  //     res.send(500);
  //   } else {

  //     res.json({
  //       message: 'File uploaded successfully',
  //       filename: req.file.filename
  //     });
  //   }
  // });
  //req.file.path chính là đường dẫn của file khi upload bằng multer
  cloudinary.uploadSingle(req.file.path).then((result) => {
    // let imageDetails = {
    //   imageUrl: req.body.file || '',
    //   cloudImage: result.url,
    //   imageId: result.id
    // }
    console.log(result.url);
   
    let productAdd = new Product({
      image: result.url,
      name: name,
      description: description,
      price: price,
      category: category
    });
  
    productAdd.save(err => {
      if (err) throw err;
      console.log('Product saved....!');
      res.redirect('/admin/product');
    });
  
  })



  //    //up multiple files
  //    uploadMultipleFiles: async(req, res) => {
  //     //req.files chính là khi upload multiple images
  //     let res_promises = req.files.map(file => new Promise((resolve, reject) => {
  //         cloudinary.uploadMultiple(file.path).then((result) => {
  //             resolve(result);
  //         })
  //     }))
  //     // Promise.all get imgas
  //     Promise.all(res_promises)
  //     .then(async (arrImg) => {
  //        //arrImg chính là array mà chúng ta đã upload 
  //        // các bạn có thể sử dụng arrImg để save vào database, hay hơn thì sử dụng mongodb
  //        res.json(req.files)
  //     })
  //     .catch((error) => {
  //         console.error('> Error>', error);
  //     })
  // },

};

exports.getEdit = function (req, res, next) {
  var id = req.params.id;
  console.log('id edit product: ' + id);
  Product.findById({ _id: req.params.id }).populate('category').exec(function (err, product) {
    if (err) throw err;
    Category.find({}, function (err, categories) {
      res.render('product/edit', { product: product, categories: categories });
    })
  })
};

exports.postEdit = (req, res, next) => {
  // User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
  //     if (err) return next(err);
  //     res.send('Product udpated.');
  // });
  const query = Product.findById({ _id: req.body.id });
  query.exec(function (err, result) {
    
    if (err) throw err;
    // change old value with new

    result.name = req.body.name;
    result.description = req.body.description;
    result.price = req.body.price;
    result.category = req.body.category;
    result.image= req.body.image;


    // save updated results
    result.save(err => {
      if (err) throw err;
      console.log('Product Updated....!');
      res.redirect('/admin/product');
    });
  });

};

exports.deleteById = (req, res, next) => {
  const query = Product.findByIdAndDelete({ _id: req.params.id });
  query.exec(function (err, result) {
    if (err) throw err;
    console.log('Product deleted....!');
    res.redirect('/admin/product');
  })
}

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