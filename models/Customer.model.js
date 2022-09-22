require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const CustomerSchema = new mongoose.Schema({

  logType: {
    type: String
  },

  firstName: {
    type: String,
    required: [true, "Please Enter firstName"],
    maxlength: 50,
    minlength: 3,
  },


  lastName: {
    type: String,
    required: [true, "Please Enter lastName"],
    maxlength: 50,
    minlength: 3,
  },

  email: {
    type: String,
    required: [true, "Please Enter Email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please Enter the password"],
    minlength: 6,
  },

  status: {
    type: String,
    enum: ['active', 'inactive', 'banned'],
    default: 'active',
  },
},
{ timestamps: true }
);

/**--------------Some Important Methods------------------ */

CustomerSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

CustomerSchema.methods.createJWT = function () {

  let payload = { userId: this._id, firstName: this.firstName };
  let secret = process.env.JWT_SECRET;
  let Expires = {
    expiresIn: process.env.JWT_LIFETIME,
  };

  return jwt.sign(payload, secret, Expires);
};

CustomerSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Customer", CustomerSchema);
