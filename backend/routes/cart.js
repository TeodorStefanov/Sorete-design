const router = require("express").Router();
const controllers = require("../controllers");
router.put("/updateCart", controllers.cart.put.updateCart);
router.put("/deleteItem", controllers.cart.put.deleteItem);
router.put("/buyItems", controllers.cart.put.deleteItem);
router.post("/addToCart", controllers.cart.post.addCart);
module.exports = router;
