var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RoleSchema = new Schema(
  {
    STT: {type: int, required: true, max: 100},
    
  }
);



//Export model
module.exports = mongoose.model('Role', RoleSchema);