var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema(
    {
        dateBill:  { type: String, required: true },
        user:  { type: Schema.Types.ObjectId, ref: 'User', required: true },
        price:  { type: Number, required: true },
       
    }
);
module.exports= mongoose.model('BillDto', schema);