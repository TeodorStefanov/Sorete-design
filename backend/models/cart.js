const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
  product: [
    {
      type: "ObjectId",
      ref: "Item",
    },
  ],
  quantity: [
    {
      L: Number,
      M: Number,
      S: Number,
    },
  ],
});
module.exports = mongoose.model("Cart", CartSchema);
