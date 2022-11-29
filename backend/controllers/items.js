const Item = require("../models/item");

const createItem = async (req, res) => {
  const obj = req.body;
  const { name, description, imageUrl, imageUrlTwo, price, category } = obj;

  try {
    const item = new Item({
      name: name.trim(),
      description: description.trim(),
      imageUrl,
      imageUrlTwo,
      price,
      category,
    });
    await item.save();
    return item;
  } catch (err) {
    return {
      error: true,
      message: err,
    };
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
const getGaufreProducts = async (req, res) => {
  try {
    const products = await Item.find({ category: "GAUFRE" });
    const productsColors = await Item.find({ category: "colors" });
    console.log(products);
    return {
      products,
      productsColors,
    };
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};
const getTowels = async (req, res) => {
  try {
    const towels = await Item.find({ category: "Towels" });
    if (towels) {
      return towels;
    }
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
  getGaufreProducts,
  getTowels
};
