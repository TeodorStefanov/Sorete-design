const env = process.env.NODE_ENV || "development";
const express = require("express");
const { getItem, createItem } = require("../controllers/items");
const router = express.Router();
const Item = require("../models/item");
router.post("/create", async (req, res) => {
  const item = await createItem(req, res);
  if (item) {
    res.status(200).send({ data: "/" });
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

module.exports = router;
