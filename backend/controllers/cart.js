const Cart = require("../models/cart");
module.exports = {
  post: {
    addCart: async (req, res) => {
      try {
        const { product, quantity } = req.body;
        const cart = new Cart({
          product: [product],
          quantity: [quantity],
        });
        const newCart = await cart.save();
        res.status(200).send(newCart._id);
      } catch (err) {
        res.status(400).send({ error: "There is an error" });
      }
    },
  },
  put: {
    updateCart: async (req, res) => {
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

        res.status(200).send(updatedCart);
      } catch (err) {
        res.status(400).send({ error: "There is an error" });
      }
    },
    deleteItem: async (req, res) => {
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

        res.status(200).send(cart);
      } catch (err) {
        res.status(400).send({ error: "There is an error" });
      }
    },
  },
};
