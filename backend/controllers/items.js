const Item = require("../models/item");
module.exports = {
  get: {
    getItem: async (req, res) => {
      try {
        const id = req.params.id;
        const item = await Item.findById(id).exec();
        if (!item) {
          return res.status(400).send({ error: "There is and error" });
        }
        res.status(200).send(item);
      } catch (err) {
        res.status(400).send({ error: "There is an error" });
      }
    },
    getGaufreProducts: async (req, res) => {
      try {
        const products = await Item.find({ category: "GAUFRE" });
        const productsColors = await Item.find({ category: "colors" });

        res.status(200).send({ products, productsColors });
      } catch (err) {
        res.status(400).send({ error: "There is and error" });
      }
    },
    getProducts: async (req, res) => {
      try {
        const products = await Item.find({ category: req.params.type });

        res.status(200).send(products);
      } catch (err) {
        res.status(400).send({ error: "There is an error" });
      }
    },
    getSearch: async (req, res) => {
      try {
        const { searchMenu } = req.params;
        const items = await Item.find();
        const itemsSearch = items.filter((el) =>
          el.name.toLowerCase().includes(searchMenu.toLowerCase())
        );
        res.status(200).send(itemsSearch);
      } catch (err) {
        res.status(400).send({ error: "There is an error" });
      }
    },
  },
  post: {
    createItem: async (req, res) => {
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
        res.status(200).send(item);
      } catch (err) {
        res.status(400).send({ error: "There is an error" });
      }
    },
  },
};
