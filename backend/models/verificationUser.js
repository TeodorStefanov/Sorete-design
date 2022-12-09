const mongoose = require("mongoose");
const verificationUserSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  uniqueString: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  expiredAt: {
    type: Date,
  },
});

module.exports = mongoose.model("verificationUser", verificationUserSchema);
