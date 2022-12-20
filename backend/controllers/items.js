const Item = require("../models/item");

const createItem = async (req, res) => {
  try {
    const {
      name,
      description,
      descriptionTwo,
      composition,
      imageUrl,
      imageUrlTwo,
      price,
      category,
    } = req.body;

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
    if (item) {
      return { item };
    } else {
      return {
        error: true,
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};
const getItem = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findById(id).exec();
    if (item) {
      return { item };
    } else {
      return {
        error: true,
      };
    }
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
    if (products && productsColors) {
      return {
        products,
        productsColors,
      };
    } else {
      return {
        error: true,
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};
const getProducts = async (req, res) => {
  try {
    const products = await Item.find({ category: req.params.type });
    if (products) {
      return {
        products,
      };
    } else {
      return {
        error: true,
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};
const getSearch = async (req, res) => {
  try {
    const { searchMenu } = req.params;
    const items = await Item.find();
    const itemsSearch = items.filter((el) =>
      el.name.toLowerCase().includes(searchMenu.toLowerCase())
    );
    if (itemsSearch) {
      return {
        itemsSearch,
      };
    } else {
      return {
        error: true,
      };
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
  getProducts,
  getSearch,
};
