const Item = require("../models/item");

const createItem = async (req, res) => {
  const obj = req.body;
  const {
    name,
    description,
    descriptionTwo,
    composition,
    imageUrl,
    imageUrlTwo,
    price,
    category,
  } = obj;

  try {
    const item = new Item({
      name: name.trim(),
      description: description.trim(),
      descriptionTwo,
      composition,
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
    const towels = await Item.find({ category: req.params.type });
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
const getSearch = async (req, res) => {
  const { searchMenu } = req.params;
  try {
    const items = await Item.find();
    const itemsSearch = items.filter((el) =>
      el.name.toLowerCase().includes(searchMenu.toLowerCase())
    );
    return itemsSearch;
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  createItem,
  getItem,
  getGaufreProducts,
  getTowels,
  getSearch,
};
