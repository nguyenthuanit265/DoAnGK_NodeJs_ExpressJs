var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    username: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
    role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
    isDelete: { type: Boolean, required: true},
  }
);

UserSchema.methods.validPassword = function (pwd) {
  
  return (this.password === pwd);
};
module.exports = mongoose.model('User', UserSchema);