var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema(
    {
      
        content:  { type: String, required: true },
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    }
);
module.exports= mongoose.model('Comment', schema);