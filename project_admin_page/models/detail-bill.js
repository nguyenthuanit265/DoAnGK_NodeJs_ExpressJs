var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema(
    {
        bill:  { type: Schema.Types.ObjectId, ref: 'Bill', required: true },
        product:  { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity:  { type: 'Number', required: true },
        
       
    }
);
module.exports= mongoose.model('DetailBill', schema);