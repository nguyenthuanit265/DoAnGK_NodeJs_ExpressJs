var Bill = require('../models/bill');
var async = require('async');
var session = require('express-session');
exports.home = (req, res, next) => {
  Bill.find({}).exec(function (err, bills) {

    if (err) { return next(err); }
    //Successful, so render
    console.log(bills);
    
    // bills.forEach(element => {
    //   billDto.push({
    //     year:element.dateBill.getYear()+1900,
        

    //   })
    //   console.log('year: '+ (element.dateBill.getYear()+1900));
    //   console.log('Day: ' + element.dateBill.getDate());
    // });
    res.render('home/index', { bills: bills });
  });

}