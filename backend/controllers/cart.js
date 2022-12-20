const Cart = require("../models/cart");

const addCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const cart = new Cart({
      product: [product],
      quantity: [quantity],
    });
    const newCart = await cart.save();
    if (newCart) {
      return { newCart };
    } else {
      return {
        error: true,
      };
    }
  } catch (err) {
    return {
      error: true,
    };
  }
};
const updateCart = async (req, res) => {
  try {
    const { id, product, quantity } = req.body;
    const updatedCart = await Cart.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          product: [product],
          quantity: [quantity],
        },
      },
      {
        new: true,
      }
    ).populate("product");
    if (updatedCart) {
      return {
        updatedCart,
      };
    } else {
      return {
        error: true,
      };
    }
  } catch (err) {
    return {
      error: true,
    };
  }
};
const deleteItem = async (req, res) => {
  try {
    const { id, product, quantity } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { _id: id },
      {
        product,
        quantity,
      },
      { new: true }
    );
    if (cart) {
      return { cart };
    } else {
      return {
        error: true,
      };
    }
  } catch (err) {
    return {
      error: true,
    };
  }
};
module.exports = {
  addCart,
  updateCart,
  deleteItem,
};
