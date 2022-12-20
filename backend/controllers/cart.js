const Cart = require("../models/cart");

const addCart = async (req, res) => {
  const { product, quantity } = req.body;
  try {
    const cart = new Cart({
      product: [product],
      quantity: [quantity],
    });
    const newCart = await cart.save();
    if(newCart) {
      return {newCart}
    }else{
      return {
        error: true
      }
    }
  } catch (err) {
    return {
      error: true
    }
  }
};
const updatedCart = async (req, res) => {
  const { id, product, quantity } = req.body;
  console.log(req.body);
  try {
    const newCart = await Cart.findOneAndUpdate(
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
    console.log(newCart);
    return newCart;
  } catch (err) {
    console.log(err);
  }
};
const deleteItem = async (req, res) => {
  const { id, product, quantity } = req.body;
  try {
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
  updatedCart,
  deleteItem,
};
