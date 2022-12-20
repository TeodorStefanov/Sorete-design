const env = process.env.NODE_ENV || "development";
const express = require("express");
const router = express.Router();
const { addCart, updatedCart, deleteItem } = require("../controllers/cart");
router.post("/addToCart", async (req, res) => {
  const {error, newCart} = await addCart(req, res);
  if (newCart) {
    res.status(200).send(newCart._id);
  }
});
router.put("/updateCart", async (req, res) => {
  const cart = await updatedCart(req, res);
  if (cart) {
    res.status(200).send(cart);
  }
});
router.put("/deleteItem", async (req, res) => {
  const { error, cart } = await deleteItem(req, res);
  res.status(200).send(cart);
});
router.put("/buyItems", async (req, res) => {
  const { error, cart } = await deleteItem(req, res);
  if (cart) {
    res.status(200).send(cart);
  }
});
module.exports = router;
