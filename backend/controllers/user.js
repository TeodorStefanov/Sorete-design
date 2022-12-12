const bcrypt = require("bcrypt");
const User = require("../models/user");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const cart = require("../models/cart");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const verificationUser = require("../models/verificationUser");
const user = require("../models/user");
const generateToken = (data) => {
  const token = jwt.sign(data, config.privetKey, { expiresIn: "1h" });
  return token;
};
const sendVerificationEmail = async ({ _id, email }) => {
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
    to: config.emailAdmin,
    subject: "User send Message",
    html: `<b>Verify your email adress to complete the signup and login into your account.</b><b>This link
    <b>expires in 6 hours</b>.</b><b>Press <a href=${
      currentUrl + "user/verify/" + _id + "/" + uniqueString
    }>here</a> to proceed.</p>`,
  };
  const messageSend = await transporter.sendMail(mailOption);
  if (!messageSend) {
    return { error: "Wrong details" };
  }
  const saltRounds = 10;
  bcrypt
    .hash(uniqueString, saltRounds)
    .then((hashedUniqueString) => {
      const newVerification = new verificationUser({
        userId: _id,
        uniqueString: hashedUniqueString,
        createdAt: Date.now(),
        expiredAt: Date.now() + 21600000,
      });
      newVerification
        .save()
        .then()
        .catch((error) => {
          return { error: error };
        });
    })
    .catch((error) => {
      return { error: error };
    });
};
const saveUser = async (req, res) => {
  const obj = req.body;
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
  } = obj;
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
    return {
      error: true,
      message: "Please enter valid credentials",
    };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
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

    const { error } = sendVerificationEmail(userObj);

    if (error) {
      return {
        error: true,
        message: error,
      };
    }
    return userObj;
  } catch (err) {
    if (err.code === 11000 && err.keyValue.email) {
      return {
        error: true,
        message: "Email already exists",
      };
    }
    if (err.code === 11000 && err.keyValue.username) {
      return {
        error: true,
        message: "Username already exists",
      };
    }
    return {
      error: true,
      message: err,
    };
  }
};
const verifyUser = async (req, res) => {
  const obj = req.body;
  const { username, password } = obj;
  try {
    const user = await User.findOne({ username }).populate("cart");
    if (user.cart) {
      const newUser = await user.cart.populate("product");
    }

    if (!user) {
      return {
        error: true,
        message: "No user",
      };
    }

    const status = await bcrypt.compare(password, user.password);
    if (!status) {
      return {
        error: true,
        message: "No user",
      };
    }
    if (!user.verified) {
      return {
        error: true,
        message: "Please verify your email.",
      };
    }
    const token = generateToken({
      userId: user._id,
      username: user.username,
    });
    return {
      token,
      user,
    };
  } catch (err) {
    console.log(err);
    return {
      error: true,
      message: "No user",
    };
  }
};
const checkAuthentication = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return false;
  }
  try {
    const decoded = jwt.verify(token, config.privetKey);
    if (decoded) {
      const { username } = decoded;
      const user = await User.findOne({ username }).populate("cart");
      console.log(user);
      if (user.cart) {
        const newUser = await user.cart.populate("product");
      }
      return user;
    }
  } catch (err) {
    if (err) {
      return false;
    }
  }
};
const editProfile = async (req, res) => {
  const obj = req.body;
  const { _id, firstName, familyName, phoneNumber, email, picture } = obj;
  const newObj = {
    firstName,
    familyName,
    phoneNumber,
    email,
    picture,
  };
  console.log(newObj);
  if (!_id || !firstName || !familyName || !phoneNumber || !email) {
    return {
      error: true,
      message: "Please enter valid credentials",
    };
  }
  try {
    const user = await User.findOneAndUpdate({ _id }, newObj, {
      new: true,
    });
    return { user };
  } catch (err) {
    if (err.code === 11000 && err.keyValue.email) {
      return {
        error: true,
        status: 409,
        message: "Email already exists",
      };
    }
    return {
      error: err,
      status: 400,
      message: "Please enter valid credentials",
    };
  }
};
const getCart = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById({ _id: id }).populate("cart");
    const userNew = await user.cart.populate("product");
    return user;
  } catch (err) {
    console.log(err);
  }
};
const createCart = async (req, res) => {
  const { id, cartId } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        cart: cartId,
      }
    ).populate("cart");
    const newUser = await user.cart.populate("product");
    return user;
  } catch (err) {
    console.log(err);
  }
};
const constactsEmail = async (req, res) => {
  const obj = req.body;
  const transporter = nodemailer.createTransport({
    service: config.emailService,
    auth: {
      user: config.emailUser,
      pass: config.emailPass,
    },
  });
  try {
    let info = await transporter.sendMail({
      from: config.emailUser,
      to: config.emailAdmin,
      subject: "User send Message",
      text: `You have new message from: ${obj.name}\nMessage: ${obj.message}\n user Email: ${obj.email}`,
      html: `<b>You have new message from: ${obj.name}\nMessage: ${obj.message}\n User Email: ${obj.email}</b>`,
    });
    if (info) {
      return { info };
    }
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};
const getVerification = async (req, res) => {
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
      await verificationUser.deleteOne({ userId });
      await User.deleteOne({ _id: userId });

      return {
        message: "Link has expired. Please sign up again.",
      };
    }
    const status = bcrypt.compareSync(uniqueString, hashedUniqueString);
    if (status) {
      await User.updateOne({ _id: userId }, { verified: true });
      await verificationUser.deleteOne({ userId });

      return {
        message: "Verification complete !",
      };
    }
  } catch (error) {
    return {
      error: true,
    };
  }
};

module.exports = {
  saveUser,
  verifyUser,
  checkAuthentication,
  editProfile,
  getCart,
  createCart,
  constactsEmail,
  getVerification,
};
