/**********************************************
 * User Model
 **********************************************/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const USER_SCHEMA = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// create model
module.exports = USER_MODEL = mongoose.model("users", USER_SCHEMA);
