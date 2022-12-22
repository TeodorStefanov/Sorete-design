const bcrypt = require("bcrypt");
const User = require("../models/user");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const verificationUser = require("../models/verificationUser");
const generateToken = (data) => {
  const token = jwt.sign(data, config.privetKey, { expiresIn: "1h" });
  return token;
};
const sendVerificationEmail = async ({ _id, email }, message, path) => {
  try {
    const currentUrl = "http://localhost:3000/";
    const uniqueString = uuidv4() + _id;
    const transporter = nodemailer.createTransport({
      service: config.emailService,
      auth: {
        user: config.emailUser,
        pass: config.emailPass,
      },
    });
    const mailOption = {
      from: config.emailUser,
      to: email,
      subject: "User send Message",
      html: `${message} <b>This link
    <b>expires in 6 hours</b>.</b><b>Press <a href=${
      currentUrl + `user/${path}/` + _id + "/" + uniqueString
    }>here</a> to proceed.</p>`,
    };
    await transporter.sendMail(mailOption);

    const saltRounds = 10;
    const hashedUniqueString = await bcrypt.hash(uniqueString, saltRounds);
    const newVerification = new verificationUser({
      userId: _id,
      uniqueString: hashedUniqueString,
      createdAt: Date.now(),
      expiredAt: Date.now() + 21600000,
    });

    await newVerification.save();
    return {
      newVerification,
    };
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};
const getVerification = async (req, res, path) => {
  const { userId, uniqueString } = req.params;
  try {
    const verifyUser = await verificationUser.findOne({ userId });
    if (!verifyUser) {
      return {
        error: true,
      };
    }
    const hashedUniqueString = verifyUser.uniqueString;
    const expiredAt = verifyUser.expiredAt;
    if (expiredAt < Date.now()) {
      if (path === "email") {
        await verificationUser.deleteOne({ userId });
        await User.deleteOne({ _id: userId });
      } else if (path === "verification") {
        await verificationUser.deleteOne({ userId });
      }

      return {
        error: true,
      };
    }
    const status = bcrypt.compareSync(uniqueString, hashedUniqueString);
    if (!status) {
      return {
        error: true,
      };
    }

    if (path === "email") {
      await User.updateOne({ _id: userId }, { verified: true });
      await verificationUser.deleteOne({ userId });
    } else if (path === "password") {
      await verificationUser.deleteOne({ userId });
    }

    return {
      message: "Verification complate!",
    };
  } catch (error) {
    return {
      error: true,
    };
  }
};
module.exports = {
  get: {
    getVerificationEmail: async (req, res) => {
      const path = "email";
      const { error, message } = await getVerification(req, res, path);
      console.log(message);
      if (message) {
        return res.status(200).send({ message: "Verification complate" });
      }
      if (error) {
        return res.status(400).send({ error: "There is an error" });
      }
    },
    getCheckVerfication: async (req, res) => {
      const path = "verification";
      const { error, message } = await getVerification(req, res, path);
      console.log(message);
      if (message) {
        return res.status(200).send({ message: "Verification complate" });
      }
      if (error) {
        return res.status(400).send({ error: "There is an error" });
      }
    },
    changePassword: async (req, res) => {
      try {
        const email = req.params.email;
        const user = await User.findOne({ email: email });
        if (!user) {
          return res.status(400).send({ error: "There is an error" });
        }
        const message = `<b>To change your password and login into your account.</b>`;
        const path = "changePassword";
        const { newVerification } = await sendVerificationEmail(
          user,
          message,
          path
        );
        if (!newVerification) {
          return res.status(400).send({ error: "There is an error" });
        }
        console.log("verification", newVerification);
        res.status(200).send();
      } catch (err) {
        res.status(400).send({ error: "There is an error" });
      }
    },
    getCart: async (req, res) => {
      try {
        const id = req.params.id;
        const user = await User.findById({ _id: id }).populate("cart");
        await user.cart.populate("product");
        res.status(200).send(user);
      } catch (err) {
        res.status(400).send({ error: "There is an error" });
      }
    },
  },
  post: {
    saveUser: async (req, res) => {
      try {
        const {
          firstName,
          familyName,
          phoneNumber,
          username,
          password,
          rePassword,
          email,
          emailError,
          usernameError,
          passwordError,
          rePasswordError,
          firstNameError,
          familyNameError,
          phoneNumberError,
        } = req.body;
        if (
          !firstName ||
          !familyName ||
          !phoneNumber ||
          !username ||
          !password ||
          !rePassword ||
          !email ||
          emailError !== "" ||
          usernameError !== "" ||
          passwordError !== "" ||
          rePasswordError !== "" ||
          firstNameError !== "" ||
          familyNameError !== "" ||
          phoneNumberError !== "" ||
          password !== rePassword
        ) {
          return res.status(400).send({ error: "There is an error" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
          firstName,
          familyName,
          phoneNumber,
          username,
          password: hashedPassword,
          email,
          picture:
            "https://res.cloudinary.com/daqcaszkf/image/upload/v1666974741/blank-profile-picture-973460__340.jpc_hcuj2e.webp",
          verified: false,
        });
        const userObj = await user.save();
        const message =
          "<b>Verify your email adress to complete the signup and login into your account.</b>";
        const path = "verify";
        const newVerification = await sendVerificationEmail(
          userObj,
          message,
          path
        );

        if (!newVerification) {
          return res.status(400).send({ error: "There is an error" });
        }
        res.status(200).send();
      } catch (err) {
        if (err.code === 11000 && err.keyValue.email) {
          return res.status(409).send({ error: "Email already exists" });
        }
        if (err.code === 11000 && err.keyValue.username) {
          return res.status(409).send({ error: "Username already exists" });
        }
        res.status(400).send({ error: "There is an error" });
      }
    },
    constactsEmail: async (req, res) => {
      try {
        const obj = req.body;
        const transporter = nodemailer.createTransport({
          service: config.emailService,
          auth: {
            user: config.emailUser,
            pass: config.emailPass,
          },
        });
        let info = await transporter.sendMail({
          from: config.emailUser,
          to: config.emailAdmin,
          subject: "User send Message",
          text: `You have new message from: ${obj.name}\nMessage: ${obj.message}\n user Email: ${obj.email}`,
          html: `<b>You have new message from: ${obj.name}\nMessage: ${obj.message}\n User Email: ${obj.email}</b>`,
        });
        if (!info) {
          return res.status(400).send({ error: "There is an error" });
        }
        res.status(200).send();
      } catch (err) {
        res.status(400).send({ error: "There is an error" });
      }
    },
    checkAuthentication: async (req, res) => {
      try {
        const { token } = req.body;

        if (!token) {
          return res.status(400).send({ error: "There is an error" });
        }
        const decoded = jwt.verify(token, config.privetKey);
        if (!decoded) {
          return res.status(400).send({ error: "There is an error" });
        }
        const { username } = decoded;
        const user = await User.findOne({ username }).populate("cart");

        if (user.cart) {
          await user.cart.populate("product");
        }
        res.status(200).send(user);
      } catch (err) {
        res.status(400).send({ error: "There is an error" });
      }
    },
    verifyUser: async (req, res) => {
      try {
        const { username, password } = req.body;
        const user = await User.findOne({ username }).populate("cart");
        if (!user) {
          return res
            .status(401)
            .send({ message: "Wrong username or password" });
        }
        if (user.cart) {
          await user.cart.populate("product");
        }

        const status = await bcrypt.compare(password, user.password);
        if (!status) {
          return res
            .status(401)
            .send({ message: "Wrong username or password" });
        }
        if (!user.verified) {
          return res.status(401).send({
            message: "Please check your email to verify your account",
          });
        }
        const token = generateToken({
          userId: user._id,
          username: user.username,
        });

        res.cookie("aid", token, { maxAge: 3600000, path: "/" });
        res.status(200).send(user);
      } catch (err) {
        res.status(400).send({ error: "There is an error" });
      }
    },
  },
  put: {
    changedPassword: async (req, res) => {
      try {
        const path = "password";
        const { error, message } = await getVerification(req, res, path);
        if (error) {
          return res.status(400).send({ error: "There is an error" });
        }
        const { userId } = req.params;
        const { password, rePassword } = req.body;
        if (!password || !rePassword || password != rePassword) {
          return res.status(400).send({ error: "There is an error" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.findOneAndUpdate(
          { _id: userId },
          { password: hashedPassword }
        );
        if (user) {
          res.status(200).send();
        }
      } catch (err) {
        res.status(400).send({ error: "There is an error" });
      }
    },
    userCreateCart: async (req, res) => {
      try {
        const { id, cartId } = req.body;
        const user = await User.findOneAndUpdate(
          { _id: id },
          {
            cart: cartId,
          }
        ).populate("cart");
        await user.cart.populate("product");
        res.status(200).send(user);
      } catch (err) {
        res.status(400).send({ error: "There is an error" });
      }
    },
    editProfile: async (req, res) => {
      try {
        const { _id, firstName, familyName, phoneNumber, picture } = req.body;
        const newObj = {
          firstName,
          familyName,
          phoneNumber,
          picture,
        };
        if (!_id || !firstName || !familyName || !phoneNumber) {
          return res.status(400).send({ error: "There is an error" });
        }

        const user = await User.findOneAndUpdate({ _id }, newObj, {
          new: true,
        }).populate("cart");
        res.status(200).send(user);
      } catch (err) {
        if (err.code === 11000 && err.keyValue.email) {
          return res.status(409).send({ error: "Email already exists" });
        }
        res.status(400).send({ error: "Please enter valid credentials" });
      }
    },
  },
};
