const env = process.env.NODE_ENV || "development";
const express = require("express");
const {
  getItem,
  createItem,
  getGaufreProducts,
} = require("../controllers/items");
const router = express.Router();
const Item = require("../models/item");
router.post("/create", async (req, res) => {
  const item = await createItem(req, res);
  if (item) {
    res.status(200).send(item);
  }
});

router.get("/", async (req, res) => {
  const items = await Item.find().then((items) => res.send(items));
});
router.get("/item/:id", async (req, res) => {
  const item = await getItem(req, res);
  if (item) {
    res.status(200).send(item);
  }
});
router.get("/products/gaufre", async (req, res) => {
  const products = await getGaufreProducts(req, res);
  if (products) {
    res.status(200).send(products);
  }
});

module.exports = router;
