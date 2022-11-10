const env = process.env.NODE_ENV || "development";
const express = require("express");
const router = express.Router();
const { cartAdd, updatedCart } = require("../controllers/cart");
router.post("/addToCart", async (req, res) => {
  const cart = await cartAdd(req, res);
  if (cart) {
    res.status(200).send(cart._id);
  }
});
router.put("/updateCart", async (req, res) => {
  const cart = await updatedCart(req, res);
  if (cart) {
    res.status(200).send(cart);
  }
});
module.exports = router;
