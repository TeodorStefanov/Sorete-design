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
const sendVerificationEmail = async ({ _id, email }, message, path) => {
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
  const messageSend = await transporter.sendMail(mailOption);
  if (!messageSend) {
    return { error: "Wrong details" };
  }

  const saltRounds = 10;
  const hashedUniqueString = await bcrypt.hash(uniqueString, saltRounds);
  try {
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
        message: "Link has expired. Please try again.",
      };
    }
    const status = bcrypt.compareSync(uniqueString, hashedUniqueString);
    if (status) {
      if (path === "email") {
        await User.updateOne({ _id: userId }, { verified: true });
        await verificationUser.deleteOne({ userId });
      } else if (path === "password") {
        await verificationUser.deleteOne({ userId });
      }

      return {
        message: "Verification complate!",
      };
    }
  } catch (error) {
    return {
      error: true,
    };
  }
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
    const message =
      "<b>Verify your email adress to complete the signup and login into your account.</b>";
    const path = "verify";
    const newVerification = sendVerificationEmail(userObj, message, path);

    if (!newVerification) {
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
      await user.cart.populate("product");
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
    await user.cart.populate("product");
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

const changePassword = async (req, res) => {
  const email = req.params.email;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const message = `<b>To change your password and login into your account.</b>`;
      const path = "changePassword";
      const newVerification = sendVerificationEmail(user, message, path);
      return newVerification;
    } else {
      return {
        error: true,
      };
    }
  } catch (err) {
    return {
      error: true,
    };
  }
};
const changedPassword = async (req, res) => {
  const path = "password";
  const { error, message } = await getVerification(req, res, path);
  if (error) {
    return {
      error: true,
    };
  }
  const { userId, uniqueString } = req.params;
  const { password, rePassword } = req.body;
  if (!password || !rePassword || password != rePassword) {
    return {
      error: true,
    };
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { password: hashedPassword }
    );
    if (user) {
      return {
        error: false,
      };
    } else {
      return {
        error: true,
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err,
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
  changePassword,
  changedPassword,
};
