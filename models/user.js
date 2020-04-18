const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "userName field is required"]
  },
  firstName: {
    type: String,
    required: [true, 'firstName field is required']
  },
  lastName: {
    type: String,
    required: [true, 'lastName field is required']
  },
  email: {
    type: String,
    required: [true, 'email field is required']
  }
})

//create model for todo
const User = mongoose.model('user', UserSchema);

module.exports = User;