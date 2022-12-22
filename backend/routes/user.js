const controllers = require("../controllers");
const router = require("express").Router();
router.get("/cart/:id", controllers.user.get.getCart);
router.get(
  "/getVerification/:userId/:uniqueString",
  controllers.user.get.getVerificationEmail
);
router.get("/changePassword/:email", controllers.user.get.changePassword);
router.get(
  "/getVerified/:userId/:uniqueString",
  controllers.user.get.getCheckVerfication
);
router.post("/registration", controllers.user.post.saveUser);
router.post("/login", controllers.user.post.verifyUser);
router.post("/verify", controllers.user.post.checkAuthentication);
router.post("/contactsEmail", controllers.user.post.constactsEmail);

router.put("/profile/edit", controllers.user.put.editProfile);
router.put("/user/createCart", controllers.user.put.userCreateCart);
router.put(
  "/changePassword/:userId/:uniqueString",
  controllers.user.put.changedPassword
);

module.exports = router;
