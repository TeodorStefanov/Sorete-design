const env = process.env.NODE_ENV || "development";
const express = require("express");
const {
  getItem,
  createItem,
  getGaufreProducts,
  getTowels,
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
router.get("/products/gaufreColors", async (req, res) => {
  const { products, productsColors } = await getGaufreProducts(req, res);
  if (products && productsColors) {
    res.status(200).send({
      products,
      productsColors,
    });
  }
});
router.get("/towels", async (req, res) => {
  const towels = await getTowels(req, res);
  if (towels) {
    res.status(200).send(towels);
  }
});

module.exports = router;
