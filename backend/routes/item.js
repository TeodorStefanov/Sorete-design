const controllers = require("../controllers");
const router = require("express").Router();
router.post("/createItem", controllers.items.post.createItem);
router.get("/", controllers.items.get.getItems);
router.get("/item/:id", controllers.items.get.getItem);
router.get("/products/gaufreColors", controllers.items.get.getGaufreProducts);
router.get("/:type", controllers.items.get.getProducts);
router.get("/search/:searchMenu", controllers.items.get.getSearch);

module.exports = router;
