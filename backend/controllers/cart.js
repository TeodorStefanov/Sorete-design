const Cart = require("../models/cart");

const cartAdd = async (req, res) => {
  const { product, quantity } = req.body;
  try {
    const cart = new Cart({
      product: [product],
      quantity: [quantity],
    });
    const cartObj = await cart.save();
    return cartObj;
  } catch (err) {
    console.log(err);
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
    );
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

    return cart;
  } catch (err) {
    console.log;
  }
};
module.exports = {
  cartAdd,
  updatedCart,
  deleteItem,
};
