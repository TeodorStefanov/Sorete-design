const controllers = require("../controllers");
const router = require("express").Router();
router.get("/item/:id", controllers.items.get.getItem);
router.get("/products/gaufreColors", controllers.items.get.getGaufreProducts);
router.get("/:type", controllers.items.get.getProducts);
router.get("/search/:searchMenu", controllers.items.get.getSearch);
router.post("/createItem", controllers.items.post.createItem);

module.exports = router;
