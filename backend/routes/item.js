const env = process.env.NODE_ENV || "development";
const express = require("express");
const { getItem } = require("../controllers/items");
const router = express.Router();
const Item = require("../models/item");
router.post("/create", async (req, res) => {
  const obj = req.body;
  const { name, description, imageUrl, price } = obj;

  try {
    const item = new Item({
      name: name.trim(),
      description: description.trim(),
      imageUrl,
      price,
    });
    console.log(item);
    await item.save();
    res.status(200).send({ data: "/" });
  } catch (err) {
    return res.render("create", {
      title: "Create Cube | Cube Workshop",
      error: "Cube details is not valid",
    });
  }
});

router.get("/", async (req, res) => {
  const items = await Item.find().then((items) => res.send(items));
});
router.get("/item/:id", async (req, res) => {
  const item  = await getItem(req, res);
  if (item) {
    res.status(200).send(item);
  }
});

module.exports = router;
