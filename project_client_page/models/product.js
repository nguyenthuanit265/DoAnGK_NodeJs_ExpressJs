var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema(
    {
        image:  { type: String, required: true },
        name:  { type: String, required: true },
        description:  { type: String, required: true },
        price:  { type: Number, required: true },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }
    }
);
module.exports= mongoose.model('Product', schema);