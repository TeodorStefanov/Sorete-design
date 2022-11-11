const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 1,
  },
  familyName: {
    type: String,
    required: true,
    minLength: 1,
  },
  picture: {
    type: String,
  },
  phoneNumber: {
    type: String,
    match: /^\d+$/,
    required: true,
    minLength: 3,
    maxLength: 32,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    match: [/^[a-z0-9_.]+$/, "Username is not Valid"],
    minLength: 8,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  },
  cart:
    {
      type: "ObjectId",
      ref: "Cart",
    },
});

module.exports = mongoose.model("User", UserSchema);
