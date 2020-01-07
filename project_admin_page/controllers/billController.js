const Bill = require('../models/bill');
const BillDto = require('../models/billDto');
const DetailBill = require('../models/detail-bill');
const async = require('async');



exports.getList = (req, res, next) => {
    Bill.find({}).populate('user').exec(function (err, bills) {
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
        res.render('bill/index', { bills: bills })
    })

}

exports.deleteById = (req, res, next) => {
    const query = Bill.findByIdAndDelete({ _id: req.params.id });
    query.exec(function (err, result) {
        if (err) throw err;
        console.log('Bill deleted....!');
        res.redirect('/admin/bill');
    })
}

exports.detail = (req, res, next) => {
    // const query = DetailBill.findById({ _id: req.params.id });
    // query.exec(function (err, result) {
    //     if (err) throw err;
    //     console.log('Bill deleted....!');
    //     res.redirect('/admin/bill');
    // })
    // Bill.findById({ _id: req.params.id }).populate('user').exec(function (err, bill) {
    //     if (err) throw err;
    //     DetailBill.findOne({bill: bill }).populate('product').exec(function (err, details) {
    //         if (err) throw err;
    
    //         res.render('bill/detail', { details: details});
    
    //     })
    //   })

      DetailBill.find({'bill': req.params.id }).populate('product').exec(function (err, details) {
        if (err) throw err;
        console.log(details);
        res.render('bill/detail', { details: details});

    })
}