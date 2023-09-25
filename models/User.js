const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
  username: {
    required: [true, 'Please provide username'],
    type: String,
    unique: true,
  },
  password: {
    required: [true, 'Please provide password'],
    type: String,
  },
});

UserSchema.pre("save", function (next) {
  const user = this;

  bcrypt.hash(user.password, 10, (err, hash) => {
    user.password = hash;
    next();
  });
});

UserSchema.plugin(uniqueValidator);
const User = mongoose.model("User", UserSchema);
module.exports = User;
