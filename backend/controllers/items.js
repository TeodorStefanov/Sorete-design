const Item = require("../models/item");

const createItem = async (req, res) => {
  const obj = req.body;
  const { name, description, imageUrl, price } = obj;

  try {
    const item = new Item({
      name: name.trim(),
      description: description.trim(),
      imageUrl,
      price,
    });
    await item.save();
    return item
  } catch (err) {
    return res.render("create", {
      title: "Create Cube | Cube Workshop",
      error: "Cube details is not valid",
    });
  }
};
const getItem = async (req, res) => {
  const id = req.params.id;
  try {
    const item = await Item.findById(id).exec();

    if (!item) {
      return {
        error: true,
        message: "Wrong userId",
      };
    }
    return item;
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};
module.exports = {
  createItem,
  getItem,
};
