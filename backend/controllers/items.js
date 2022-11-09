const Item = require("../models/item");

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
  getItem,
};
