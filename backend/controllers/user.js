const bcrypt = require("bcrypt");
const User = require("../models/user");

const config = require("../config/config");
const jwt = require("jsonwebtoken");

const generateToken = (data) => {
  const token = jwt.sign(data, config.privetKey, { expiresIn: "1h" });
  return token;
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
    });
    const userObj = await user.save();
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
    const token = generateToken({
      userId: user._id,
      username: user.username,
    });
    return {
      token,
      user,
    };
  } catch (err) {
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
    ).then((updatedUser) => res.send(updatedUser));
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  saveUser,
  verifyUser,
  checkAuthentication,
  editProfile,
  getCart,
  createCart,
};
