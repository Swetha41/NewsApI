const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const encrypt= require('mongoose-encryption');

const Schema = mongoose.Schema;


  const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type : String,
        require: true
    },
  });

const secret="Thisissecret";
userSchema.plugin(encrypt,{secret:secret,encryptedFields:["password"]});
  var User = mongoose.model('user', userSchema);
  module.exports = User;