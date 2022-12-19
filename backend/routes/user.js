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
  constactsEmail,
  getVerification,
  changePassword,
  changedPassword,
} = require("../controllers/user");
const verificationUser = require("../models/verificationUser");

router.post("/registration", async (req, res) => {
  const { error, message } = await saveUser(req, res);
  if (!error) {
    res.status(200).send(true);
  } else {
    res.status(409).send({ error: message });
  }
});
router.post("/login", async (req, res) => {
  const { token, user, error, message } = await verifyUser(req, res);
  if (error) {
    if (message != "No user") {
      res.status(401).send({
        message: "Please check your email to verify your account",
      });
      return;
    }
    res.status(401).send({
      message: "Wrong username or password.",
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
router.post("/contactsEmail", async (req, res) => {
  const { error, info, message } = await constactsEmail(req, res);
  if (info) {
    res.status(200).send({ message: "Message has been send" });
  }
  if (error) {
    res.status(401).send({ error: message });
  }
});
router.get("/getVerification/:userId/:uniqueString", async (req, res) => {
  const path = "email";
  const { error, message } = await getVerification(req, res, path);
  console.log("message", message);
  if (message) {
    res.status(200).send({ message });
  } else {
    res.status(401).send({
      message:
        "Error. Your link has been activeted already or wrong details.Plese sign up again.",
    });
  }
});
router.get("/changePassword/:email", async (req, res) => {
  const { error } = await changePassword(req, res);
  if (!error) {
    res.status(200).send({ message: "Please check your email." });
  } else {
    res.status(401).send({ message: "Enter valid email" });
  }
});
router.put("/changePassword/:userId/:uniqueString", async (req, res) => {
  const { error } = await changedPassword(req, res);
  if (!error) {
    res.status(200).send({ message: "Successfully changed password" });
  }
});
router.get("/getVerified/:userId/:uniqueString", async (req, res) => {
  const path = "varification";
  const { error, message } = await getVerification(req, res, path);
  if (message) {
    res.status(200).send({ message });
  }
});

module.exports = router;
