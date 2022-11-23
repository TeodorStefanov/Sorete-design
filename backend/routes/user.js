const env = process.env.NODE_ENV || "development";
const express = require("express");

const router = express.Router();
const {
  saveUser,
  verifyUser,
  checkAuthentication,
  editProfile,
  createCart,
  getCart,
} = require("../controllers/user");

router.post("/registration", async (req, res) => {
  const { error, message } = await saveUser(req, res);
  if (!error) {
    res.status(200).send(true);
  } else {
    res.status(409).send({ error: message });
  }
});
router.post("/login", async (req, res) => {
  const { token, user, error } = await verifyUser(req, res);
  if (error) {
    res.status(401).send({
      message: "unauthorized",
    });
  }
  if (token) {
    res.cookie("aid", token, { maxAge: 3600000, path: "/" });
    res.send(user);
  }
});
router.post("/verify", async (req, res) => {
  const user = await checkAuthentication(req, res);
  if (user) {
    res.send(user);
  }
});
router.put("/profile/edit", async (req, res) => {
  const { user, error, status, message } = await editProfile(req, res);
  if (!error) {
    res.status(200).send(user);
  } else {
    res.status(status).send({ error: message });
  }
});
router.get("/cart/:id", async (req, res) => {
  const user = await getCart(req, res);
  if (user) {
    res.status(200).send(user);
  }
});
router.put("/user/createCart", async (req, res) => {
  const updatedUser2 = await createCart(req, res);
  if (updatedUser2) {
    res.status(200).send(updatedUser2);
  }
});

module.exports = router;
