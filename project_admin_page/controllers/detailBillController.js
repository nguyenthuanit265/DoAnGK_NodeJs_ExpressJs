const Bill = require('../models/bill');
const BillDto = require('../models/billDto');
const DetailBill = require('../models/detail-bill');
const async = require('async');



exports.getList = (req, res, next) => {
    DetailBill.find({}).populate('product').exec(function (err, details) {
        if (err) throw err;
        // bills.forEach(element => {
        //     let today = new Date();
        //     let dd = today.getDate();
        //     let mm = today.getMonth() + 1; //January is 0!

        //     let yyyy = today.getFullYear();
        //     if (dd < 10) {
        //     dd = '0' + dd;
        //     } 
        //     if (mm < 10) {
        //     mm = '0' + mm;
        //     } 
        //      today = dd + '/' + mm + '/' + yyyy;

        //      console.log(today);
        //      element.dateBill = today;
        // });
        res.render('detail-bill/index', { details: details })
    })

}